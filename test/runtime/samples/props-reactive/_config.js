export default {
	props: {
		a: 1,
		b: 2,
		c: 3,
		d: 4
	},

	html: `
		<p>4</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.d = 5;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>5</p>
		`);
	}
};
