export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			obj.foo.bar.baz.val: initial obj.foo.bar.baz.val value
			rs_obj_foo_bar_baz_val triggered: 1
			rs_obj_foo_bar_baz_val: initial obj.foo.bar.baz.val value
		`);

		component.change_obj_foo_bar_baz_val_benefit('something');
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2
			obj.foo.bar.baz.val: something
			rs_obj_foo_bar_baz_val triggered: 2
			rs_obj_foo_bar_baz_val: something
		`);

		// change again
		component.change_obj_foo_bar_baz_val_benefit(100);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar.baz.val: 100
			rs_obj_foo_bar_baz_val triggered: 3
			rs_obj_foo_bar_baz_val: 100
		`);

		// don't change
		component.change_obj_foo_bar_baz_val_benefit(100);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar.baz.val: 100
			rs_obj_foo_bar_baz_val triggered: 3
			rs_obj_foo_bar_baz_val: 100
		`);
		
	}
};
