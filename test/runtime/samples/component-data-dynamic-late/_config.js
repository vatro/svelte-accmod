export default {
	test({ assert, component, target, flush, compileOptions }) {
		component.q = 42;
		compileOptions.accessorsAsync ? flush() : null;
		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual( target.innerHTML, `
			<p>42</p>
		` );
	}
};
