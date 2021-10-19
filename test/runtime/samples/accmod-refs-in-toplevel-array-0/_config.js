export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children[0]:0
			child0.foo:1
			child0-updated:1
			rs-child0.foo:1
		`);


		// using a component reference saved inside an array to access 'Child0' / change 'child0.foo'
		// - update ONLY the referenced 'Child0'-component (main.children[0]) -> do NOT update 'main'-component! (this is different in unmodified Svelte)
		// - don't trigger array's reactive statements -> we haven't changed the main.children array! (this is different in unmodified Svelte)
		component.set_foo_of_children_0(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children[0]:0
			child0.foo:2
			child0-updated:2
			rs-child0.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_children_0(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children[0]:0
			child0.foo:3
			child0-updated:3
			rs-child0.foo:3
		`);
	}
};
