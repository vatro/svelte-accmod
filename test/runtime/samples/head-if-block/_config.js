export default {
	props: {
		condition: false
	},

	test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.document.title, '');

		component.condition = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.title, 'woo!!!');
	}
};
