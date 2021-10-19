export default {
	html: `
		<p>Foo</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = component.Bar;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Bar</p>
		`);
	}
};
