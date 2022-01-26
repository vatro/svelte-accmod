export default {
	html: `
		<div>7</div>
	`,
	async test({ component, target, assert, flush, compileOptions }) {
		component.a = 5;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>9</div>
		`);
	}
};
