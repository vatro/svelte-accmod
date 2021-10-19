export default {
	props: {
		x: true
	},

	html: `
		<div><p>true, therefore Foo</p></div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div><p>false, therefore Bar</p></div>
		`);
	}
};
