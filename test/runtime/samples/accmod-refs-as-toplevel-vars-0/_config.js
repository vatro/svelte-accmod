export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 1
			child0 updated: 1
			child0.foo rs: 1
		`);

		// change value
		component.set_foo_of_child0(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 2
			child0 updated: 2
			child0.foo rs: 2
		`);

		// change value again
		component.set_foo_of_child0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 3
			child0 updated: 3
			child0.foo rs: 3
		`);

		// don't change value
		component.set_foo_of_child0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 3
			child0 updated: 3
			child0.foo rs: 3
		`);

		// async (scheduled) accessors
		component.set_foo_of_child0(4);
		component.set_foo_of_child0(5);
		component.set_foo_of_child0(6);
		component.set_foo_of_child0(7);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 7
			child0 updated: 4
			child0.foo rs: 4
		`);

		component.reset_foo_of_child0();
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updated: 1
			child0.foo: 1
			child0 updated: 5
			child0.foo rs: 5
		`);
	}
};
