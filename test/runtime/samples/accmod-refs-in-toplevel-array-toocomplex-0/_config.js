export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on mount
		// main 	update: yes
		// main.children[0] reactive statement: no
		// child0 	update: yes
		// child0.foo reactive statement: yes

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children[0]:0
			child0.foo:1
			child0-updated:1
			rs-child0.foo:1
		`);


		// using a component reference saved inside an array to access / change foo
		// - update only the referenced component (children[0])
		// - don't trigger array's reactive statements (we didn't change the main.children array!)

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
	}
};
