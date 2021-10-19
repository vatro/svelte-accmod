export default {
	props: {
		x: 1,
		y: false
	},

	html: `
		<span>1</span>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<span>2</span>
		`);
	}
};
