export default {

	async test({ assert, component, target, flush }) {
		const input = target.querySelector('input');
		component.value = undefined;
		flush();

		assert.equal(input.value, 'undefined');

		component.value = 'foobar';
		flush();

		assert.equal(input.value, 'foobar');
	}
};
