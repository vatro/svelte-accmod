/* generated by 'svelte-accmod' / Svelte vX.Y.Z */
import {
	SvelteComponent,
	append,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "svelte/internal";

function create_fragment(ctx) {
	let div0;
	let p0;
	let t1;
	let p1;
	let t4;
	let p2;
	let t7;
	let div1;
	let p3;
	let t8;
	let t9;

	return {
		c() {
			div0 = element("div");
			p0 = element("p");
			p0.textContent = "Hello world";
			t1 = space();
			p1 = element("p");
			p1.textContent = `Hello ${world1}`;
			t4 = space();
			p2 = element("p");
			p2.textContent = `Hello ${world2}`;
			t7 = space();
			div1 = element("div");
			p3 = element("p");
			t8 = text("Hello ");
			t9 = text(/*world3*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, p0);
			append(div0, t1);
			append(div0, p1);
			append(div0, t4);
			append(div0, p2);
			insert(target, t7, anchor);
			insert(target, div1, anchor);
			append(div1, p3);
			append(p3, t8);
			append(p3, t9);
		},
		p(ctx, [dirty]) {
			if (dirty & /*world3*/ 1) set_data(t9, /*world3*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t7);
			if (detaching) detach(div1);
		}
	};
}

let world1 = 'world';
let world2 = 'world';

function instance($$self, $$props, $$invalidate) {
	const world3 = 'world';

	function foo() {
		$$invalidate(0, world3 = 'svelte');
	}

	return [world3];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;