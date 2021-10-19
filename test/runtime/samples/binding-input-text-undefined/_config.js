export default {
	html: `
		<input>
	`,

	ssrHtml: `
		<input>
	`,

	async test({ assert, component, target, flush, compileOptions }) {
		const input = target.querySelector('input');
		assert.equal(input.value, '');

		component.x = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.value, '');

		component.x = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.value, '');

		component.x = 'string';
		compileOptions.accessorsAsync ? flush() : null;
		component.x = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.value, '');

		component.x = 0;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.value, '0');

		component.x = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.value, '');
	}
};
