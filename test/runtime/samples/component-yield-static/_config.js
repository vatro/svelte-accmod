export default {
	html: `
		<b>Hello</b>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.name = 'World';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<b>Hello</b> World
		` );
	}
};
