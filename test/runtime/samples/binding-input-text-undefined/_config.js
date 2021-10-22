export default {
	html: `
		<input>
	`,

	ssrHtml: `
		<input>
	`,

	async test({ assert, component, target, flush }) {
		const input = target.querySelector('input');
		assert.equal(input.value, '');

		component.x = null;
		flush();
		assert.equal(input.value, '');

		component.x = undefined;
		flush();
		assert.equal(input.value, '');

		component.x = 'string';
		flush();
		component.x = undefined;
		flush();
		assert.equal(input.value, '');

		component.x = 0;
		flush();
		assert.equal(input.value, '0');

		component.x = undefined;
		flush();
		assert.equal(input.value, '');
	}
};
