export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 1, foo: 4, rs_foo: 1
			childslot 1 updates: 1, foo: 5, rs_foo: 1
			childslot 2 updates: 1, foo: 6, rs_foo: 1
		`);


		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		// change 'foo' of all slots (at depth 0)
		component.change_all_slots_foo(1, 2, 3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 2, foo: 1, rs_foo: 2
			childslot 1 updates: 2, foo: 2, rs_foo: 2
			childslot 2 updates: 2, foo: 3, rs_foo: 2
		`);

		// double-check
		component.change_all_slots_foo(4, 5, 6);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 3, foo: 4, rs_foo: 3
			childslot 1 updates: 3, foo: 5, rs_foo: 3
			childslot 2 updates: 3, foo: 6, rs_foo: 3
		`);

		// change foo of single slot (first at depth 0)
		component.change_childslot_0_foo(10);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 4, foo: 10, rs_foo: 4
			childslot 1 updates: 3, foo: 5, rs_foo: 3
			childslot 2 updates: 3, foo: 6, rs_foo: 3
		`);

		// change foo of single slot (second at depth 0)
		component.change_childslot_1_foo(20);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 4, foo: 10, rs_foo: 4
			childslot 1 updates: 4, foo: 20, rs_foo: 4
			childslot 2 updates: 3, foo: 6, rs_foo: 3
		`);

		// change foo of single slot (third at depth 0)
		component.change_childslot_2_foo(30);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 4, foo: 10, rs_foo: 4
			childslot 1 updates: 4, foo: 20, rs_foo: 4
			childslot 2 updates: 4, foo: 30, rs_foo: 4
		`);

		// change foo of main
		component.change_main_foo(40);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 40, rs_foo: 1
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 4, foo: 10, rs_foo: 4
			childslot 1 updates: 4, foo: 20, rs_foo: 4
			childslot 2 updates: 4, foo: 30, rs_foo: 4
		`);

		// change foo of child
		component.change_child_foo(50);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 40, rs_foo: 1
			child updates: 2, foo: 50, rs_foo: 1
			childslot 0 updates: 4, foo: 10, rs_foo: 4
			childslot 1 updates: 4, foo: 20, rs_foo: 4
			childslot 2 updates: 4, foo: 30, rs_foo: 4
		`);
	}
};
