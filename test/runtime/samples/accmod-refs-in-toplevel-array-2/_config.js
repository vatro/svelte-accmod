export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK:  accessors are async! before first update per default.

		// 'subchild0.children' is being triggered TWICE on mount because:
		// - 'subchild0.children' is truthy on init (+1 rs)
		// - we're adding an element to 'subchild0.children' ([0]) onMount (+1 rs)

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children[0]: 1
			subsubchild0.foo: 1
			subsubchild0 updated: 1
			rs subsubchild0.foo: 1
		`);


		// using a component reference saved inside an array to access 'SubSubChild0' / change 'subsubchild0.foo'
		// - update ONLY the referenced 'SubSubChild0'-component (child0.subchild0.children[0]) -> do NOT update 'main', 'Child0' or 'SubChild0' components!
		// - don't trigger 'children'-array's reactive statements -> we haven't changed the child0.subchild0.children array!
		component.set_foo_of_child0_subchild0_children_0(2);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children[0]: 1
			subsubchild0.foo: 2
			subsubchild0 updated: 2
			rs subsubchild0.foo: 2
		`);

		// change value again
		component.set_foo_of_child0_subchild0_children_0(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children[0]: 1
			subsubchild0.foo: 3
			subsubchild0 updated: 3
			rs subsubchild0.foo: 3
		`);

		// don't change value (correct: no effect)
		component.set_foo_of_child0_subchild0_children_0(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children[0]: 1
			subsubchild0.foo: 3
			subsubchild0 updated: 3
			rs subsubchild0.foo: 3
		`);
	}
};
