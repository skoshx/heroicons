/* generated by Svelte v3.43.0 */
"use strict";

const { SvelteComponent, append, attr, detach, init, insert, noop, safe_not_equal, svg_element } = require("svelte/internal");

function create_fragment(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "d", "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "fill", "none");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke-width", "2");
			attr(svg, "stroke", "currentColor");
			attr(svg, "aria-hidden", "true");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p(ctx, [dirty]) {
			if (dirty & /*classes*/ 1) {
				attr(svg, "class", /*classes*/ ctx[0]);
			}

			if (dirty & /*style*/ 2) {
				attr(svg, "style", /*style*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { class: classes = '' } = $$props;
	let { style = '' } = $$props;

	$$self.$$set = $$props => {
		if ('class' in $$props) $$invalidate(0, classes = $$props.class);
		if ('style' in $$props) $$invalidate(1, style = $$props.style);
	};

	return [classes, style];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { class: 0, style: 1 });
	}
}

exports.default = Component;