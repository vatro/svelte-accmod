export default {
	html: `
		One
		Inner
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '' );

		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, 'One\nInner' );
	}
};
