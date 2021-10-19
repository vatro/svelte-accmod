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
			childslot 3 updates: 1, foo: 3, rs_foo: 1
		`);

		// after first update ...
		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		// Change 'foo' of the deepest slot
		component.set_foo_in_max_depth_childslot(4);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 1, foo: undefined, rs_foo: 0
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);

		component.set_foo_in_childslot_depth_0(5);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 2, foo: 5, rs_foo: 1
			childslot 1 updates: 1, foo: undefined, rs_foo: 0
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);

		component.set_foo_in_childslot_depth_1(6);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 2, foo: 5, rs_foo: 1
			childslot 1 updates: 2, foo: 6, rs_foo: 1
			childslot 2 updates: 1, foo: undefined, rs_foo: 0
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);

		component.set_foo_in_childslot_depth_2(7);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 2, foo: 5, rs_foo: 1
			childslot 1 updates: 2, foo: 6, rs_foo: 1
			childslot 2 updates: 2, foo: 7, rs_foo: 1
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);

		component.set_main_foo(8);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 8, rs_foo: 1
			child updates: 1, foo: undefined, rs_foo: 0
			childslot 0 updates: 2, foo: 5, rs_foo: 1
			childslot 1 updates: 2, foo: 6, rs_foo: 1
			childslot 2 updates: 2, foo: 7, rs_foo: 1
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);

		component.set_child_foo(9);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 8, rs_foo: 1
			child updates: 2, foo: 9, rs_foo: 1
			childslot 0 updates: 2, foo: 5, rs_foo: 1
			childslot 1 updates: 2, foo: 6, rs_foo: 1
			childslot 2 updates: 2, foo: 7, rs_foo: 1
			childslot 3 updates: 2, foo: 4, rs_foo: 2
		`);
	}
};
