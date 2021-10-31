export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 1, foo: undefined, rs_foo: 0, props_obj x:4 y:5 z:6, rs_props_obj: 1
		`);


		// after first update ...
		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!


		// TODO  Delete / Update comment below, it's fixed now!!!
		//
		// IMPORTANT: When the component reference is being rereferenced in a function, 'accmod' behaves the same way as native Svelte,
		// because the modified invalidation is NOT being used -> accessor-statements are not being wrapped by $$invalidate(..), 
		// so 'accmod' uses the original invalidation routine. This means we will not unwanted components updates ("FIX"), BUT
		// just as with native Svelte changing the 'props_obj' will not trigger related reactive statements and will not update the component / DOM.
		// 
		// CONCLUSION: When rereferencing components native and 'accmod' behaviors will be the same, INCL. THE BAD PART of e.g. like here
		// the 'prop_obj' not triggering reactive statements / not updating DOM!
		//
		// WHICH MEANS (VERY IMPORTANT):
		// In order to get the BEST (intended) 'accmod' functionality the HEAD of an
		// accessors-member-expression MUST be a component reference AND ...
		// - ... saved in a variable declared at component's top-level (of any component)
		// - ... saved in an object ({},[]) declared at component's top-level (of any component)

		component.set_foo_and_props_obj_in_max_depth_childslot(1, 7, 8, 9);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 2, foo: 1, rs_foo: 1, props_obj x:7 y:8 z:9, rs_props_obj: 2
		`);


		// again - confirm
		component.set_foo_and_props_obj_in_max_depth_childslot(2, 10, 11, 12);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);


		component.set_main_foo(13);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 13, rs_foo: 1
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);

		component.set_child_foo(14);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 13, rs_foo: 1
			child updates: 2, foo: 14, rs_foo: 1
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);
	}
};
