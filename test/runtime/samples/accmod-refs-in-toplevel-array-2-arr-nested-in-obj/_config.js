export default {

	test({ assert, component, target, flush, compileOptions }) {

		// on init / on mount

		// 'rs subchild0.children' & 'rs subchild0.children.all' are being triggered TWICE on init / on mount because:
		// - 'subchild0.children' is truthy on init (+1 rs)
		// - we're adding an element to 'subchild0.children.all' ([0]) onMount (+1 rs)
		
		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children.all: 2
			rs subchild0.children.all[0]: 1
			subsubchild0.foo: 1
			subsubchild0 updated: 1
			rs subsubchild0.foo: 1
		`);
		
		// using a component reference saved inside an array nested in an object to access 'SubSubChild0' / change 'subsubchild0.foo'
		// - update ONLY the referenced 'SubSubChild0'-component (child0.subchild0.children[0]) -> do NOT update 'main', 'Child0' or 'SubChild0' components!
		// - DON'T trigger 'children'-objects's or 'children.all'-array's reactive statements! -> we don't change the child0.subchild0.children object or
		//	 the child0.subchild0.children.all array (only using references inside it)!

		component.set_foo_of_child0_subchild0_children_all_0(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children.all: 2
			rs subchild0.children.all[0]: 1
			subsubchild0.foo: 2
			subsubchild0 updated: 2
			rs subsubchild0.foo: 2
		`);
		
		/*
		// change value again
		// this would normally be sync (accessors default behavior) and trigger an additional (unwanted) 'main' update.
		// if 'useAccMod' and 'accessorsAsync' are set to 'false': test fails here due to an additional (unwanted) 'main' update.
		component.set_foo_of_child0_subchild0_children_all_0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children.all: 2
			rs subchild0.children.all[0]: 1
			subsubchild0.foo: 3
			subsubchild0 updated: 3
			rs subsubchild0.foo: 3
		`);
	
		// don't change value
		component.set_foo_of_child0_subchild0_children_all_0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0 updated: 1
			subchild0 updated: 1
			rs subchild0.children: 2
			rs subchild0.children.all: 2
			rs subchild0.children.all[0]: 1
			subsubchild0.foo: 3
			subsubchild0 updated: 3
			rs subsubchild0.foo: 3
		`);
		*/
	}
};
