export default {
	props: {
		x: 1
	},

	html: `
		<p>{"x":1}</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>{"x":2}</p>
		`);
	}
};
