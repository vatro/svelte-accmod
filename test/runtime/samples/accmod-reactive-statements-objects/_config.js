export default {
	
	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 1
			rs_foo: 1
			rs_foo_a: 0
			rs_foo_b: 0
			rs_foo_c: 0
			rs_foo_d: 0
			rs_foo_e: 0
		`);

		// IMPORTANT  'accmod' Remark:
		// Reactive statements related to objects work the same way as the ones related to arrays. 
		// see runtime test: 'accmod-reactive-statements-arrays'
		// This is GOOD, because it is consistent behavior!

		// IMPORTANT  'accmod' Remark:
		// Reactive statements related to object's keys refrences, e.g. `obj.key = 1; $: obj.key ? ...`
		// will be triggered when 'obj' is being changed (by e.g. adding a new key or changing any of the existing keys' values).
		// If the operation sets but doesn't change the value of an existing key, 'obj'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		component.set_new_key_in_child_foo_obj('a', 1);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 2
			rs_foo: 2
			rs_foo_a: 1
			rs_foo_b: 0
			rs_foo_c: 0
			rs_foo_d: 0
			rs_foo_e: 0
		`);

		component.set_new_key_in_child_foo_obj('b', 1);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 3
			rs_foo: 3
			rs_foo_a: 2
			rs_foo_b: 1
			rs_foo_c: 0
			rs_foo_d: 0
			rs_foo_e: 0
		`);

		component.set_new_key_in_child_foo_obj('c', 1);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 4
			rs_foo: 4
			rs_foo_a: 3
			rs_foo_b: 2
			rs_foo_c: 1
			rs_foo_d: 0
			rs_foo_e: 0
		`);


		// change one of the values
		component.change_key_in_child_foo_obj('c', 2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 5
			rs_foo: 5
			rs_foo_a: 4
			rs_foo_b: 3
			rs_foo_c: 2
			rs_foo_d: 0
			rs_foo_e: 0
		`);

		// don't change value
		component.change_key_in_child_foo_obj('c', 2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 5
			rs_foo: 5
			rs_foo_a: 4
			rs_foo_b: 3
			rs_foo_c: 2
			rs_foo_d: 0
			rs_foo_e: 0
		`);

		// benefit

		component.set_new_key_in_child_foo_obj_benefit('d', 1);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 6
			rs_foo: 6
			rs_foo_a: 5
			rs_foo_b: 4
			rs_foo_c: 3
			rs_foo_d: 1
			rs_foo_e: 0
		`);


		component.change_key_in_child_foo_obj_benefit('d', 2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 7
			rs_foo: 7
			rs_foo_a: 6
			rs_foo_b: 5
			rs_foo_c: 4
			rs_foo_d: 2
			rs_foo_e: 0
		`);

		// don't change value
		component.change_key_in_child_foo_obj_benefit('d', 2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
			child updates: 7
			rs_foo: 7
			rs_foo_a: 6
			rs_foo_b: 5
			rs_foo_c: 4
			rs_foo_d: 2
			rs_foo_e: 0
		`);

	}
};
