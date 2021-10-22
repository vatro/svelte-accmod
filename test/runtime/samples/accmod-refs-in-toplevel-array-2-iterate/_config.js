export default {

	async test({ assert, component, target, flush }) {

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
			subsubchild1.foo:1
			subsubchild1-updated:1
			rs-subsubchild1.foo:1
			subsubchild2.foo:1
			subsubchild2-updated:1
			rs-subsubchild2.foo:1
		`);


		// using a component references saved inside an array to access 'SubSubChildX' / change 'subsubchildX.foo'
		// - update ONLY the referenced 'SubSubChildX'-component (child0.subchild0.children[X]) -> do NOT update 'main', 'Child0' or 'SubChild0' components!
		// - don't trigger 'children'-array's reactive statements -> we don't change the child0.subchild0.children array (only using references inside it)!
		component.set_foo_of_child0_subchild0_children_all(2);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children[0]:0
			subsubchild0.foo:2
			subsubchild0-updated:2
			rs-subsubchild0.foo:2
			subsubchild1.foo:2
			subsubchild1-updated:2
			rs-subsubchild1.foo:2
			subsubchild2.foo:2
			subsubchild2-updated:2
			rs-subsubchild2.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_child0_subchild0_children_all(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children[0]:0
			subsubchild0.foo:3
			subsubchild0-updated:3
			rs-subsubchild0.foo:3
			subsubchild1.foo:3
			subsubchild1-updated:3
			rs-subsubchild1.foo:3
			subsubchild2.foo:3
			subsubchild2-updated:3
			rs-subsubchild2.foo:3
		`);
	}
};
