const fs = require('fs').promises
const camelcase = require('camelcase')
const { promisify } = require('util')
const rimraf = promisify(require('rimraf'))
const svgr = require('@svgr/core').default
const babel = require('@babel/core')
const { compile: compileVue } = require('@vue/compiler-dom')
const { compile: compileSvelte } = require('svelte/compiler')
const { dirname } = require('path')

let transform = {
  react: async (svg, componentName, format) => {
    let component = await svgr(svg, { ref: true }, { componentName })
    let { code } = await babel.transformAsync(component, {
      plugins: [[require('@babel/plugin-transform-react-jsx'), { useBuiltIns: true }]],
    })

    if (format === 'esm') {
      return code
    }

    return code
      .replace('import * as React from "react"', 'const React = require("react")')
      .replace('export default', 'module.exports =')
  },
  vue: (svg, componentName, format) => {
    let { code } = compileVue(svg, {
      mode: 'module',
    })

    if (format === 'esm') {
      return code.replace('export function', 'export default function')
    }

    return code
      .replace(
        /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/,
        (_match, imports, _quote, mod) => {
          let newImports = imports
            .split(',')
            .map((i) => i.trim().replace(/\s+as\s+/, ': '))
            .join(', ')

          return `const { ${newImports} } = require("${mod}")`
        }
      )
      .replace('export function render', 'module.exports = function render')
  },
  svelte: (svg, componentName, format) => {
    svg = transformSvgForSvelte(svg)
    const { js } = compileSvelte(svg, { format })
    const { code } = js

    if (format === 'esm') {
      return code.replace('export function', 'export default function')
    }

    return code
      .replace(
        /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/,
        (_match, imports, _quote, mod) => {
          let newImports = imports
            .split(',')
            .map((i) => i.trim().replace(/\s+as\s+/, ': '))
            .join(', ')

          return `const { ${newImports} } = require("${mod}")`
        }
      )
  }
}

function transformSvgForSvelte(svg) {
  svg = svg.replace('xmlns="http://www.w3.org/2000/svg"', 'xmlns="http://www.w3.org/2000/svg" class={classes} {style}')
  
  return `
<script>
  let classes = '';
  export let style = '';
  export { classes as class };
</script>
${svg}`;
}

async function getIcons(style) {
  let files = await fs.readdir(`./optimized/${style}`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${style}/${file}`, 'utf8'),
      componentName: `${camelcase(file.replace(/\.svg$/, ''), {
        pascalCase: true,
      })}Icon`,
    }))
  )
}

function exportAll(icons, format, extension = '.js') {
  return icons
    .map(({ componentName }) => {
      if (format === 'esm' || extension === '.svelte') {
        return `export { default as ${componentName} } from './${componentName}${extension}'`
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`
    })
    .join('\n')
}

function getTypes(package, componentName) {
  if (package === 'svelte') return `import { SvelteComponentTyped } from 'svelte';\nexport default class ${componentName} extends SvelteComponentTyped<svelte.JSX.HTMLAttributes<HTMLOrSVGElement>> {}`
  else if (package === 'react') return `import * as React from 'react';\ndeclare function ${componentName}(props: React.ComponentProps<'svg'>): JSX.Element;\nexport default ${componentName};\n`
  else return `export default import("vue").DefineComponent;`
}

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true })
  await fs.writeFile(file, text, 'utf8')
}

async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2))
}

async function buildIcons(package, style, format) {
  let outDir = `./${package}/${style}`
  if (format === 'esm') {
    outDir += '/esm'
  }

  let icons = await getIcons(style)

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await transform[package](svg, componentName, format)
      let types = getTypes(package, componentName)

      if (package === 'svelte') {
        const code = transformSvgForSvelte(svg, style) // Create .svelte files for SSR
        fs.writeFile(`${outDir}/${componentName}.svelte`, code, 'utf8')
      }

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types)] : []),
      ]
    })
  )

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format, package === 'svelte' ? '.svelte' : '.js'))

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, 'esm', package === 'svelte' ? '.svelte' : '.js'))
}

async function main(package) {
  const cjsPackageJson = { module: './esm/index.js', sideEffects: false }
  const esmPackageJson = { type: 'module', sideEffects: false }
  const sveltePackageJson = { module: './index.js', svelte: './index.js', sideEffects: false };

  console.log(`Building ${package} package...`)

  await Promise.all([rimraf(`./${package}/outline/*`), rimraf(`./${package}/solid/*`)])

  await Promise.all([
    buildIcons(package, 'solid', 'esm'),
    buildIcons(package, 'solid', 'cjs'),
    buildIcons(package, 'outline', 'esm'),
    buildIcons(package, 'outline', 'cjs'),
    ensureWriteJson(`./${package}/outline/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/outline/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/solid/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/solid/esm/package.json`, esmPackageJson)
  ])
  if (package === 'svelte') {
    await Promise.all([
      ensureWriteJson(`./${package}/outline/esm/package.json`, sveltePackageJson),
      ensureWriteJson(`./${package}/outline/package.json`, sveltePackageJson),
      ensureWriteJson(`./${package}/solid/esm/package.json`, sveltePackageJson),
      ensureWriteJson(`./${package}/solid/package.json`, sveltePackageJson)
    ])
  }

  return console.log(`Finished building ${package} package.`)
}

let [package] = process.argv.slice(2)

if (!package) {
  throw new Error('Please specify a package')
}

main(package)
