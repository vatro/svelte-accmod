export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			obj.foo.bar.baz.arr: [1,2,3]
			rs_obj_foo_bar_baz_arr triggered: 1
			rs_obj_foo_bar_baz_arr: [1,2,3]
		`);

		component.change_items_of_obj_foo_bar_baz_arr_benefit([4, 5, 6]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2
			obj.foo.bar.baz.arr: [4,5,6]
			rs_obj_foo_bar_baz_arr triggered: 2
			rs_obj_foo_bar_baz_arr: [4,5,6]
		`);

		// change again
		component.change_items_of_obj_foo_bar_baz_arr_benefit([7, 8, 9]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar.baz.arr: [7,8,9]
			rs_obj_foo_bar_baz_arr triggered: 3
			rs_obj_foo_bar_baz_arr: [7,8,9]
		`);

		// don't change -> no updates / reactive statements triggered!
		// IMPORTANT  & COOL:
		// if we target single items of an array, an update / reactive statements will
		// only be triggered if the items change, this applies only for primitive values in an array
		// setting object type items in an array (Object or Array) will always trigger updates ('immutable:false' --> 'safe_not_equal')
		component.change_items_of_obj_foo_bar_baz_arr_benefit([7, 8, 9]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar.baz.arr: [7,8,9]
			rs_obj_foo_bar_baz_arr triggered: 3
			rs_obj_foo_bar_baz_arr: [7,8,9]
		`);

		// change again
		component.change_items_of_obj_foo_bar_baz_arr_benefit([10, 11, 12]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 4
			obj.foo.bar.baz.arr: [10,11,12]
			rs_obj_foo_bar_baz_arr triggered: 4
			rs_obj_foo_bar_baz_arr: [10,11,12]
		`);
	}
};
