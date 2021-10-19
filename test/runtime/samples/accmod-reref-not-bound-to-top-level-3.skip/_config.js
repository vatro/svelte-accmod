export default {

	skip: true,

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: undefined, rs_foo: 0
		`);

		// after first update ...
		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		// change 'foo' of all slots (at depth 0)
		component.change_foo();
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 22, rs_foo: 1
		`);
	}
};
