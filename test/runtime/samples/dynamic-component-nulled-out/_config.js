export default {
	html: `
		<p>Foo</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		const Bar = component.Bar;

		component.Bar = null;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');

		component.Bar = Bar;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Foo</p>
		`);
	}
};
