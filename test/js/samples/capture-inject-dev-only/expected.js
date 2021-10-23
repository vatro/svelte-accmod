/* generated by 'svelte-accmod' / Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	set_input_value,
	space,
	text
} from "svelte/internal";

function create_fragment(ctx) {
	let p;
	let t0;
	let t1;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			p = element("p");
			t0 = text(/*foo*/ ctx[0]);
			t1 = space();
			input = element("input");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t0);
			insert(target, t1, anchor);
			insert(target, input, anchor);
			set_input_value(input, /*foo*/ ctx[0]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*foo*/ 1) set_data(t0, /*foo*/ ctx[0]);

			if (dirty & /*foo*/ 1 && input.value !== /*foo*/ ctx[0]) {
				set_input_value(input, /*foo*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
			if (detaching) detach(t1);
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let foo = "bar";

	function input_input_handler() {
		foo = this.value;
		$$invalidate(0, foo);
	}

	return [foo, input_input_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}

	get $cty_config() {
		return {};
	}
}

export default Component;