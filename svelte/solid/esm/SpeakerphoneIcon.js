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
			attr(path, "fill-rule", "evenodd");
			attr(path, "d", "M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z");
			attr(path, "clip-rule", "evenodd");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "style", /*style*/ ctx[1]);
			attr(svg, "viewBox", "0 0 20 20");
			attr(svg, "fill", "currentColor");
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