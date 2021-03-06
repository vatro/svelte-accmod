/* generated by 'svelte-accmod' / Svelte vX.Y.Z */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "svelte/internal";

function create_fragment(ctx) {
	let div0;
	let t;
	let div1;
	let div1_style_value;

	return {
		c() {
			div0 = element("div");
			t = space();
			div1 = element("div");
			attr(div0, "style", /*style*/ ctx[0]);
			attr(div1, "style", div1_style_value = "" + (/*key*/ ctx[1] + ": " + /*value*/ ctx[2]));
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t, anchor);
			insert(target, div1, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*style*/ 1) {
				attr(div0, "style", /*style*/ ctx[0]);
			}

			if (dirty & /*key, value*/ 6 && div1_style_value !== (div1_style_value = "" + (/*key*/ ctx[1] + ": " + /*value*/ ctx[2]))) {
				attr(div1, "style", div1_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t);
			if (detaching) detach(div1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { style } = $$props;
	let { key } = $$props;
	let { value } = $$props;

	$$self.$$set = $$props => {
		if ('style' in $$props) $$invalidate(0, style = $$props.style);
		if ('key' in $$props) $$invalidate(1, key = $$props.key);
		if ('value' in $$props) $$invalidate(2, value = $$props.value);
	};

	return [style, key, value];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { style: 0, key: 1, value: 2 });
	}

	get style() {
		return this.$$.ctx[0];
	}

	set style(style) {
		this.$set({ style });
	}

	get key() {
		return this.$$.ctx[1];
	}

	set key(key) {
		this.$set({ key });
	}

	get value() {
		return this.$$.ctx[2];
	}

	set value(value) {
		this.$set({ value });
	}

	get $cty_config() {
		return {};
	}
}

export default Component;