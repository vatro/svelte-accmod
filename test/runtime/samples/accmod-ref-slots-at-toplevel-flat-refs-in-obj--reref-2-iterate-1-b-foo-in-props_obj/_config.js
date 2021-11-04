export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.

		// props_obj ist truthy at init, starts with rs_props_obj: 1, get's updated in childslots on mount -> rs_props_obj +1 -> rs_props_obj: 2
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 1, props_obj.foo: 4, rs_props_obj: 2
			childslot 1 updates: 1, props_obj.foo: 5, rs_props_obj: 2
			childslot 2 updates: 1, props_obj.foo: 6, rs_props_obj: 2
		`);

		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		// change 'foo' of all slots (at depth 0)
		component.change_all_slots_foo(1, 2, 3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 2, props_obj.foo: 1, rs_props_obj: 3
			childslot 1 updates: 2, props_obj.foo: 2, rs_props_obj: 3
			childslot 2 updates: 2, props_obj.foo: 3, rs_props_obj: 3
		`);

		// double-check
		component.change_all_slots_foo(4, 5, 6);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 3, props_obj.foo: 4, rs_props_obj: 4
			childslot 1 updates: 3, props_obj.foo: 5, rs_props_obj: 4
			childslot 2 updates: 3, props_obj.foo: 6, rs_props_obj: 4
		`);

		// change foo of single slot (first at depth 0)
		component.change_childslot_0_foo(10);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 4, props_obj.foo: 10, rs_props_obj: 5
			childslot 1 updates: 3, props_obj.foo: 5, rs_props_obj: 4
			childslot 2 updates: 3, props_obj.foo: 6, rs_props_obj: 4
		`);

		// change foo of single slot (second at depth 0)
		component.change_childslot_1_foo(20);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 4, props_obj.foo: 10, rs_props_obj: 5
			childslot 1 updates: 4, props_obj.foo: 20, rs_props_obj: 5
			childslot 2 updates: 3, props_obj.foo: 6, rs_props_obj: 4
		`);

		// change foo of single slot (third at depth 0)
		component.change_childslot_2_foo(30);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 4, props_obj.foo: 10, rs_props_obj: 5
			childslot 1 updates: 4, props_obj.foo: 20, rs_props_obj: 5
			childslot 2 updates: 4, props_obj.foo: 30, rs_props_obj: 5
		`);

		// change foo of main
		component.change_main_foo(40);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, props_obj.foo: 40, rs_props_obj: 2
			child updates: 1, props_obj.foo: undefined, rs_props_obj: 1
			childslot 0 updates: 4, props_obj.foo: 10, rs_props_obj: 5
			childslot 1 updates: 4, props_obj.foo: 20, rs_props_obj: 5
			childslot 2 updates: 4, props_obj.foo: 30, rs_props_obj: 5
		`);

		// change foo of child
		component.change_child_foo(50);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, props_obj.foo: 40, rs_props_obj: 2
			child updates: 2, props_obj.foo: 50, rs_props_obj: 2
			childslot 0 updates: 4, props_obj.foo: 10, rs_props_obj: 5
			childslot 1 updates: 4, props_obj.foo: 20, rs_props_obj: 5
			childslot 2 updates: 4, props_obj.foo: 30, rs_props_obj: 5
		`);

	}
};
