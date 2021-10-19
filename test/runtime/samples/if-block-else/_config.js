export default {
	props: {
		foo: true,
		bar: false
	},

	html: `
		<p>foo</p>
		<p>not bar</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>not foo</p>
			<p>not bar</p>
		` );

		component.bar = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>not foo</p>
			<p>bar</p>
		` );

		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>foo</p>
			<p>bar</p>
		` );
	}
};
