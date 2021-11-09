/* generated by 'svelte-accmod' / Svelte vX.Y.Z */
import {
	SvelteComponent,
	create_component,
	destroy_component,
	init,
	mount_component,
	noop,
	safe_not_equal,
	transition_in,
	transition_out
} from "svelte/internal";

function create_fragment(ctx) {
	let nested;
	let current;
	nested = new /*Nested*/ ctx[0]({ props: { foo: "bar" } });

	return {
		c() {
			create_component(nested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(nested, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(nested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(nested, detaching);
		}
	};
}

function instance($$self) {
	const Nested = window.Nested;
	return [Nested];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;