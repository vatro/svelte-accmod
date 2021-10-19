export default {
	props: {
		a: 1
	},

	html: `
		<p>foo 1</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.a = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>foo 2</p>
		`);
	}
};
