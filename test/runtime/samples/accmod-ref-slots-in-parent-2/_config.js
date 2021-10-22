export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot updates: 1, foo: 2, rs_foo: 1
			childslot updates: 1, foo: 3, rs_foo: 1
			childslot updates: 1, foo: 4, rs_foo: 1
			childslot updates: 1, foo: 0, rs_foo: 0
		`);

		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		component.set_slots_foo_values(1);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot updates: 2, foo: 1, rs_foo: 2
			childslot updates: 2, foo: 2, rs_foo: 2
			childslot updates: 2, foo: 3, rs_foo: 2
			childslot updates: 1, foo: 0, rs_foo: 0
		`);


		component.set_loose_slot_foo_value(10);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot updates: 2, foo: 1, rs_foo: 2
			childslot updates: 2, foo: 2, rs_foo: 2
			childslot updates: 2, foo: 3, rs_foo: 2
			childslot updates: 2, foo: 10, rs_foo: 1
		`);

		component.set_main_foo(20);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 20, rs_foo: 1
			child updates: 1, foo: 0, rs_foo: 0
			childslot updates: 2, foo: 1, rs_foo: 2
			childslot updates: 2, foo: 2, rs_foo: 2
			childslot updates: 2, foo: 3, rs_foo: 2
			childslot updates: 2, foo: 10, rs_foo: 1
		`);

		component.set_child_foo(30);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 20, rs_foo: 1
			child updates: 2, foo: 30, rs_foo: 1
			childslot updates: 2, foo: 1, rs_foo: 2
			childslot updates: 2, foo: 2, rs_foo: 2
			childslot updates: 2, foo: 3, rs_foo: 2
			childslot updates: 2, foo: 10, rs_foo: 1
		`);
	}
};
