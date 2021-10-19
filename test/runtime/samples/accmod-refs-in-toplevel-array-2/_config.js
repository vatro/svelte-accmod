export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children[0]:0
			subsubchild0.foo:1
			subsubchild0-updated:1
			rs-subsubchild0.foo:1
		`);


		// using a component reference saved inside an array to access 'SubSubChild0' / change 'subsubchild0.foo'
		// - update ONLY the referenced 'SubSubChild0'-component (child0.subchild0.children[0]) -> do NOT update 'main', 'Child0' or 'SubChild0' components!
		// - don't trigger 'children'-array's reactive statements -> we haven't changed the child0.subchild0.children array!
		component.set_foo_of_child0_subchild0_children_0(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children[0]:0
			subsubchild0.foo:2
			subsubchild0-updated:2
			rs-subsubchild0.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_child0_subchild0_children_0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children[0]:0
			subsubchild0.foo:3
			subsubchild0-updated:3
			rs-subsubchild0.foo:3
		`);
	}
};
