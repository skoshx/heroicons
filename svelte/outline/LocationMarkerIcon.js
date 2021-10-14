/* generated by Svelte v3.43.0 */
"use strict";

const { SvelteComponent, append, attr, detach, init, insert, noop, safe_not_equal, svg_element } = require("svelte/internal");

function create_fragment(ctx) {
	let svg;
	let path0;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "stroke-linecap", "round");
			attr(path0, "stroke-linejoin", "round");
			attr(path0, "stroke-width", "2");
			attr(path0, "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z");
			attr(path1, "stroke-linecap", "round");
			attr(path1, "stroke-linejoin", "round");
			attr(path1, "stroke-width", "2");
			attr(path1, "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "fill", "none");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke", "currentColor");
			attr(svg, "aria-hidden", "true");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
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