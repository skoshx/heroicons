/* generated by Svelte v3.41.0 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	init,
	insert,
	noop,
	safe_not_equal,
	svg_element
} from "svelte/internal";

function create_fragment(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "stroke-linecap", "round");
			attr(path, "stroke-linejoin", "round");
			attr(path, "stroke-width", "2");
			attr(path, "d", "M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "fill", "none");
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "stroke", "currentColor");
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

export default Component;