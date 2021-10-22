export default {
	props: {
		inputType: 'text',
		inputValue: 42
	},

	html: '<input type="text">',
	ssrHtml: '<input type="text" value="42">',

	test({ assert, component, target, flush }) {
		const input = target.querySelector('input');
		assert.equal(input.type, 'text');
		assert.equal(input.value, '42');

		component.inputType = 'number';
		flush();
		assert.equal(input.type, 'number');
	}
};
