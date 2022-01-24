/* generated by 'svelte-accmod' / Svelte vX.Y.Z-1 */
import {
	SvelteComponent,
	append,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "svelte/internal";

function create_if_block_4(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "a";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (16:1) {#if b}
function create_if_block_3(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "b";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (20:1) {#if c}
function create_if_block_2(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "c";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (26:1) {#if d}
function create_if_block_1(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "d";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (33:0) {#if e}
function create_if_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "e";
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let t0;
	let p0;
	let t2;
	let t3;
	let t4;
	let p1;
	let t6;
	let t7;
	let if_block4_anchor;
	let if_block0 = /*a*/ ctx[0] && create_if_block_4(ctx);
	let if_block1 = /*b*/ ctx[1] && create_if_block_3(ctx);
	let if_block2 = /*c*/ ctx[2] && create_if_block_2(ctx);
	let if_block3 = /*d*/ ctx[3] && create_if_block_1(ctx);
	let if_block4 = /*e*/ ctx[4] && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			p0 = element("p");
			p0.textContent = "this can be used as an anchor";
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			t4 = space();
			p1 = element("p");
			p1.textContent = "so can this";
			t6 = space();
			if (if_block3) if_block3.c();
			t7 = space();
			if (if_block4) if_block4.c();
			if_block4_anchor = empty();
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t0);
			append(div, p0);
			append(div, t2);
			if (if_block1) if_block1.m(div, null);
			append(div, t3);
			if (if_block2) if_block2.m(div, null);
			append(div, t4);
			append(div, p1);
			append(div, t6);
			if (if_block3) if_block3.m(div, null);
			insert(target, t7, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert(target, if_block4_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*a*/ ctx[0]) {
				if (if_block0) {
					
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*b*/ ctx[1]) {
				if (if_block1) {
					
				} else {
					if_block1 = create_if_block_3(ctx);
					if_block1.c();
					if_block1.m(div, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*c*/ ctx[2]) {
				if (if_block2) {
					
				} else {
					if_block2 = create_if_block_2(ctx);
					if_block2.c();
					if_block2.m(div, t4);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*d*/ ctx[3]) {
				if (if_block3) {
					
				} else {
					if_block3 = create_if_block_1(ctx);
					if_block3.c();
					if_block3.m(div, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*e*/ ctx[4]) {
				if (if_block4) {
					
				} else {
					if_block4 = create_if_block(ctx);
					if_block4.c();
					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (detaching) detach(t7);
			if (if_block4) if_block4.d(detaching);
			if (detaching) detach(if_block4_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { a } = $$props;
	let { b } = $$props;
	let { c } = $$props;
	let { d } = $$props;
	let { e } = $$props;

	$$self.$$set = $$props => {
		if ('a' in $$props) $$invalidate(0, a = $$props.a);
		if ('b' in $$props) $$invalidate(1, b = $$props.b);
		if ('c' in $$props) $$invalidate(2, c = $$props.c);
		if ('d' in $$props) $$invalidate(3, d = $$props.d);
		if ('e' in $$props) $$invalidate(4, e = $$props.e);
	};

	return [a, b, c, d, e];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { a: 0, b: 1, c: 2, d: 3, e: 4 });
	}

	get a() {
		return this.$$.ctx[0];
	}

	set a(a) {
		this.$set({ a });
	}

	get b() {
		return this.$$.ctx[1];
	}

	set b(b) {
		this.$set({ b });
	}

	get c() {
		return this.$$.ctx[2];
	}

	set c(c) {
		this.$set({ c });
	}

	get d() {
		return this.$$.ctx[3];
	}

	set d(d) {
		this.$set({ d });
	}

	get e() {
		return this.$$.ctx[4];
	}

	set e(e) {
		this.$set({ e });
	}

	get $cty_config() {
		return {};
	}
}

export default Component;