export default {

	async test({ assert, component, target, flush, compileOptions}) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.
		assert.htmlEqual(target.innerHTML, `
			main_updated:1
			child0_updated:1
			subchild0_updated:1
			subsubchild0_updated:1
			subsubchild0.foo:0
			rs_subsubchild0.foo:0
		`);
		
		
		component.set_subsubchild0_foo(1);
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(target.innerHTML, `
			main_updated:1
			child0_updated:1
			subchild0_updated:1
			subsubchild0_updated:2
			subsubchild0.foo:1
			rs_subsubchild0.foo:1
		`);

		
		//again
		component.set_subsubchild0_foo(2);
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(target.innerHTML, `
			main_updated:1
			child0_updated:1
			subchild0_updated:1
			subsubchild0_updated:3
			subsubchild0.foo:2
			rs_subsubchild0.foo:2
		`);

	
		//and again to make really sure
		component.set_subsubchild0_foo(3);
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(target.innerHTML, `
			main_updated:1
			child0_updated:1
			subchild0_updated:1
			subsubchild0_updated:4
			subsubchild0.foo:3
			rs_subsubchild0.foo:3
		`);
	}
};
