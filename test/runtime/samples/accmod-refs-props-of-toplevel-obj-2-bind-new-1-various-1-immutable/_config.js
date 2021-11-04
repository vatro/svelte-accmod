export default {
	immutable: true,
	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on init / on mount
		// rs-subchild0.children get's triggered twice on init / on mount:
		// 	1. children is truthy at init
		// 	2. we change the children object by adding a prop 'subsubchild0' on mount
		// rs-subchild0.children.subsubchild0 get's triggered once on mount:
		// 	- children.subsubchild0 is truthy after prop 'subsubchild0' has been added on mount

		// IMPORTANT  REMARK (immutable version):
		// 'subchild0.children' doesn't trigger related reactive statements, but component update behavior is OK / as intended!

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:1
			subsubchild0-updated:1
			rs-subsubchild0.foo:1
		`);


		// using a component reference saved inside an object to access 'SubSubChild0' / change 'subsubchild0.foo'
		// - update ONLY the referenced 'SubSubChild0'-component (main.child0.subchild0.children.subsubchild0) -> do NOT update 'main', 'child0' or 'subchild0' components! (this is different in unmodified Svelte)
		// - don't trigger object's reactive statements -> we haven't changed the main.child0.subchild0.children object! (this is different in unmodified Svelte)
		component.set_foo_of_subsubchild0_a(2);
		compileOptions.accessorsAsync ? flush() : null;

		component.set_foo_of_subsubchild0_b(3);
		compileOptions.accessorsAsync ? flush() : null;

		component.set_foo_of_subsubchild0_c(4);
		compileOptions.accessorsAsync ? flush() : null;

		component.set_foo_of_subsubchild0_d(5);
		compileOptions.accessorsAsync ? flush() : null;

		component.set_foo_of_subsubchild0_e(6);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:6
			subsubchild0-updated:6
			rs-subsubchild0.foo:6
		`);

		/**/
		component.set_foo_of_subsubchild0_f(7);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:7
			subsubchild0-updated:7
			rs-subsubchild0.foo:7
		`);



		component.set_foo_of_subsubchild0_g(8);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:8
			subsubchild0-updated:8
			rs-subsubchild0.foo:8
		`);


		component.set_foo_of_subsubchild0_h(9);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:9
			subsubchild0-updated:9
			rs-subsubchild0.foo:9
		`);


		component.set_foo_of_subsubchild0_i(10);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:10
			subsubchild0-updated:10
			rs-subsubchild0.foo:10
		`);


		component.set_foo_of_subsubchild0_j(11);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:11
			subsubchild0-updated:11
			rs-subsubchild0.foo:11
		`);


		component.set_foo_of_subsubchild0_j(12);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:12
			subsubchild0-updated:12
			rs-subsubchild0.foo:12
		`);

		component.set_foo_of_subsubchild0_k(13);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:13
			subsubchild0-updated:13
			rs-subsubchild0.foo:13
		`);

		component.set_foo_of_subsubchild0_l(14);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:14
			subsubchild0-updated:14
			rs-subsubchild0.foo:14
		`);
	}
};
