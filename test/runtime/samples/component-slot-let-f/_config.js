export default {
	html: `
		<span>1</span>
		<span>1</span>
	`,

	async test({ assert, target, component, flush, compileOptions }) {
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<span>2</span>
			<span>2</span>
		`);
	}
};
