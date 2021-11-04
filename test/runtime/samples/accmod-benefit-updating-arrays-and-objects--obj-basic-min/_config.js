export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			obj.foo.bar: 0
			rs_obj_foo_bar triggered: 1
			rs_obj_foo_bar: 0
		`);

		component.change_obj_foo_bar_benefit(100);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2
			obj.foo.bar: 100
			rs_obj_foo_bar triggered: 2
			rs_obj_foo_bar: 100
		`);

		// change again
		component.change_obj_foo_bar_benefit(200);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar: 200
			rs_obj_foo_bar triggered: 3
			rs_obj_foo_bar: 200
		`);

		// don't change
		component.change_obj_foo_bar_benefit(200);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 3
			obj.foo.bar: 200
			rs_obj_foo_bar triggered: 3
			rs_obj_foo_bar: 200
		`);
		
	}
};
