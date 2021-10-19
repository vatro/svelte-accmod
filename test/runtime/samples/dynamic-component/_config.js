export default {
	props: {
		x: true
	},

	html: `
		<p>true, therefore Foo</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>false, therefore Bar</p>
		`);
	}
};
