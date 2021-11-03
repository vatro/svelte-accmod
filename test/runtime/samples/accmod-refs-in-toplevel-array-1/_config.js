export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount
		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			rs child0.children: 2
			rs child0.children[0]: 1
			subchild0.foo: 1
			subchild0 updated: 1
			rs subchild0.foo: 1
		`);


		// using a component reference saved inside an array to access 'SubChild0' / change 'subchild0.foo'
		// - update ONLY the referenced 'SubChild0'-component (child0.children[0]) -> do NOT update 'main' or 'child0' components! (this is different in unmodified Svelte)
		// - don't trigger 'children'-array's reactive statements -> we haven't changed the child0.children array! (this is different in unmodified Svelte)
		component.set_foo_of_child0_children_0(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			rs child0.children: 2
			rs child0.children[0]: 1
			subchild0.foo: 2
			subchild0 updated: 2
			rs subchild0.foo: 2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_child0_children_0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			rs child0.children: 2
			rs child0.children[0]: 1
			subchild0.foo: 3
			subchild0 updated: 3
			rs subchild0.foo: 3
		`);
	}
};
