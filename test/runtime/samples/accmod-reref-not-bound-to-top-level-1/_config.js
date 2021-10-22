export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main updates: 1, foo: 0, rs_foo: 0
		`);


		// - only modified components and slots should be updated / rerendered!
		// - modified props should trigger related reactive statements on change!

		// change 'foo' of all slots (at depth 0)
		component.change_foo();
		flush();

		assert.htmlEqual(target.innerHTML, `
			main updates: 2, foo: 22, rs_foo: 1
		`);
	}
};
