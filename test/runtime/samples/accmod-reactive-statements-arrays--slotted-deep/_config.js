export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 1
			child foo: , rs_foo: 1, foo.length: 0
			child rs_foo_0: 0
			child rs_foo_1: 0
			child rs_foo_2: 0
			child rs_foo_3: 0
			child rs_foo_4: 0
		`);

		// IMPORTANT  'accmod' Remark:
		// Reactive statements bound to computed array item refrences, e.g. `arr[0] = 'a'; $: arr[0] ? ...`
		// will be triggered when 'arr' is being changed (by e.g. adding an item or changing any of the items). If the operation
		// sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.add_item_to_child_foo_at_specific_index(0, 'a');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 2
			child foo: a, rs_foo: 2, foo.length: 1
			child rs_foo_0: 1
			child rs_foo_1: 0
			child rs_foo_2: 0
			child rs_foo_3: 0
			child rs_foo_4: 0
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.add_item_to_child_foo_at_specific_index(3, 'b');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 3
			child foo: a,,,b, rs_foo: 3, foo.length: 4
			child rs_foo_0: 2
			child rs_foo_1: 0
			child rs_foo_2: 0
			child rs_foo_3: 1
			child rs_foo_4: 0
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.add_item_to_child_foo_at_specific_index(1, {});
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 4
			child foo: a,[object Object],,b, rs_foo: 4, foo.length: 4
			child rs_foo_0: 3
			child rs_foo_1: 1
			child rs_foo_2: 0
			child rs_foo_3: 2
			child rs_foo_4: 0
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.add_item_to_child_foo_at_specific_index(2, 20);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 5
			child foo: a,[object Object],20,b, rs_foo: 5, foo.length: 4
			child rs_foo_0: 4
			child rs_foo_1: 2
			child rs_foo_2: 1
			child rs_foo_3: 3
			child rs_foo_4: 0
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.add_item_to_child_foo_at_end([1, 2, 3]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 6
			child foo: a,[object Object],20,b,1,2,3, rs_foo: 6, foo.length: 5
			child rs_foo_0: 5
			child rs_foo_1: 3
			child rs_foo_2: 2
			child rs_foo_3: 4
			child rs_foo_4: 1
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (bad) and every parent-update +1 (bad), nothing else (NO child-update, rs_foo NOT triggered)!
		component.change_item_in_child_foo_at_specific_index(0, 'ax');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 7
			child foo: ax,[object Object],20,b,1,2,3, rs_foo: 7, foo.length: 5
			child rs_foo_0: 6
			child rs_foo_1: 4
			child rs_foo_2: 3
			child rs_foo_3: 5
			child rs_foo_4: 2
		`);

		// No value change check
		// IMPORTANT  'accmod' remark:
		// If the operation sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		component.change_item_in_child_foo_at_specific_index(0, 'ax');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 7
			child foo: ax,[object Object],20,b,1,2,3, rs_foo: 7, foo.length: 5
			child rs_foo_0: 6
			child rs_foo_1: 4
			child rs_foo_2: 3
			child rs_foo_3: 5
			child rs_foo_4: 2
		`);

		// SVELTE 'unmodified': bad -> would trigger nothing, NO updates, NO reactive statements!
		component.add_key_value_pair_to_obj_in_child_foo(1, 'bar', 1000);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 8
			child foo: ax,[object Object],20,b,1,2,3, rs_foo: 8, foo.length: 5
			child rs_foo_0: 7
			child rs_foo_1: 5
			child rs_foo_2: 4
			child rs_foo_3: 6
			child rs_foo_4: 3
		`);

		// IMPORTANT  'accmod' remark:
		// If the operation sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		// SVELTE 'unmodified': bad -> would trigger nothing, NO updates, NO reactive statements!
		component.add_key_value_pair_to_obj_in_child_foo(1, 'bar', 1000);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 8
			child foo: ax,[object Object],20,b,1,2,3, rs_foo: 8, foo.length: 5
			child rs_foo_0: 7
			child rs_foo_1: 5
			child rs_foo_2: 4
			child rs_foo_3: 6
			child rs_foo_4: 3
		`);

		// SVELTE 'unmodified': bad/good -> would trigger main-update +1 (bad) and every parent-update +1 (bad)
		// + (good) foo-reactive-statements (good) and a child update.
		component.recreate_child_foo_clone_spread_new_array(['a', 'b', 'c', 'd', 'e']);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			parent-0 updates: 1
			parent-1 updates: 1
			parent-2 updates: 1
			parent-3 updates: 1
			parent-4 updates: 1
			child updates: 9
			child foo: a,b,c,d,e, rs_foo: 9, foo.length: 5
			child rs_foo_0: 8
			child rs_foo_1: 6
			child rs_foo_2: 5
			child rs_foo_3: 7
			child rs_foo_4: 4
		`);

	}
};
