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
			attr(path, "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z");
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