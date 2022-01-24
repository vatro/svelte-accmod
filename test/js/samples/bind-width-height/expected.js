/* generated by 'svelte-accmod' / Svelte vX.Y.Z-1 */
import {
	SvelteComponent,
	add_render_callback,
	add_resize_listener,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "svelte/internal";

function create_fragment(ctx) {
	let div;
	let div_resize_listener;

	return {
		c() {
			div = element("div");
			div.textContent = "some content";
			add_render_callback(() => /*div_elementresize_handler*/ ctx[2].call(div));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[2].bind(div));
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			div_resize_listener();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { w } = $$props;
	let { h } = $$props;

	function div_elementresize_handler() {
		w = this.offsetWidth;
		h = this.offsetHeight;
		$$invalidate(0, w);
		$$invalidate(1, h);
	}

	$$self.$$set = $$props => {
		if ('w' in $$props) $$invalidate(0, w = $$props.w);
		if ('h' in $$props) $$invalidate(1, h = $$props.h);
	};

	return [w, h, div_elementresize_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { w: 0, h: 1 });
	}

	get w() {
		return this.$$.ctx[0];
	}

	set w(w) {
		this.$set({ w });
	}

	get h() {
		return this.$$.ctx[1];
	}

	set h(h) {
		this.$set({ h });
	}

	get $cty_config() {
		return {};
	}
}

export default Component;