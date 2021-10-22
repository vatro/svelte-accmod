export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// IMPORTANT : accessors are 'async' before first update per default (won't trigger immediate flush per statement).
		// 'per default' means (also) in 'unmodified' SVELTE .
		
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 1, foo: 0, rs_foo: 0
			childslot 1 updates: 1, foo: 0, rs_foo: 0
			childslot 2 updates: 1, foo: 0, rs_foo: 0
			childslot 3 updates: 1, foo: 0, rs_foo: 0, props_obj x:4 y:5 z:6, rs_props_obj: 1
		`);

		component.set_foo_and_props_obj_in_max_depth_childslot(1, 7, 8, 9);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 1, foo: 0, rs_foo: 0
			childslot 1 updates: 1, foo: 0, rs_foo: 0
			childslot 2 updates: 1, foo: 0, rs_foo: 0
			childslot 3 updates: 2, foo: 1, rs_foo: 1, props_obj x:7 y:8 z:9, rs_props_obj: 2
		`);

		// again - confirm
		component.set_foo_and_props_obj_in_max_depth_childslot(2, 10, 11, 12);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 1, foo: 0, rs_foo: 0
			childslot 1 updates: 1, foo: 0, rs_foo: 0
			childslot 2 updates: 1, foo: 0, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);

		component.set_main_foo(1);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 1, rs_foo: 1
			child updates: 1, foo: 0, rs_foo: 0
			childslot 0 updates: 1, foo: 0, rs_foo: 0
			childslot 1 updates: 1, foo: 0, rs_foo: 0
			childslot 2 updates: 1, foo: 0, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);

		component.set_child_foo(1);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 1, rs_foo: 1
			child updates: 2, foo: 1, rs_foo: 1
			childslot 0 updates: 1, foo: 0, rs_foo: 0
			childslot 1 updates: 1, foo: 0, rs_foo: 0
			childslot 2 updates: 1, foo: 0, rs_foo: 0
			childslot 3 updates: 3, foo: 2, rs_foo: 2, props_obj x:10 y:11 z:12, rs_props_obj: 3
		`);
	}
};
