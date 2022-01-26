export default {
	html: `
		<div>4 ^ 4 = 256</div>
	`,
	async test({ component, target, assert, flush, compileOptions }) {
		component.value = 3;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>3 ^ 4 = 81</div>
		`);
	}
};
