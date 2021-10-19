export default {

	async test({ assert, component, target, flush, compileOptions }) {
		const input = target.querySelector('input');
		component.value = undefined;
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(input.value, 'undefined');

		component.value = 'foobar';
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(input.value, 'foobar');
	}
};
