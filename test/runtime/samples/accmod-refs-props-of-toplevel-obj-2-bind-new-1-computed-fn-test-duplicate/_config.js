export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on init / on mount
		// rs-subchild0.children get's triggered twice on init / on mount:
		// 	1. children is truthy at init
		// 	2. we change the children object by adding a prop 'subsubchild0' on mount
		// rs-subchild0.children.subsubchild0 get's triggered once on mount:
		// 	- children.subsubchild0 is truthy after prop 'subsubchild0' has been added on mount
		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:2
			rs-subchild0.children.subsubchild0:1
			subsubchild0.foo:1
			subsubchild0-updated:1
			rs-subsubchild0.foo:1
		`);


		/**/
		component.set_foo_of_subsubchild0_a(2);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:2
			rs-subchild0.children.subsubchild0:1
			subsubchild0.foo:2
			subsubchild0-updated:2
			rs-subsubchild0.foo:2
		`);

		/*again _a*/
		component.set_foo_of_subsubchild0_a(3);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:2
			rs-subchild0.children.subsubchild0:1
			subsubchild0.foo:3
			subsubchild0-updated:3
			rs-subsubchild0.foo:3
		`);

		/*same as _a*/
		component.set_foo_of_subsubchild0_b(4);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:2
			rs-subchild0.children.subsubchild0:1
			subsubchild0.foo:4
			subsubchild0-updated:4
			rs-subsubchild0.foo:4
		`);

		/*same as _a*/
		component.set_foo_of_subsubchild0_c(5);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:2
			rs-subchild0.children.subsubchild0:1
			subsubchild0.foo:5
			subsubchild0-updated:5
			rs-subsubchild0.foo:5
		`);


	}
};
