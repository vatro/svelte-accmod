export default {
	props: {
		x: 1
	},

	html: `
		<p>Foo 1</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Foo 2</p>
		`);
	}
};
