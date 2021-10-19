export default {
	props: {
		inputType: 'text',
		inputValue: 42
	},

	html: '<input type="text">',
	ssrHtml: '<input type="text" value="42">',

	test({ assert, component, target, flush, compileOptions }) {
		const input = target.querySelector('input');
		assert.equal(input.type, 'text');
		assert.equal(input.value, '42');

		component.inputType = 'number';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(input.type, 'number');
	}
};
