export default {
	props: {
		adjective: 'custom'
	},

	test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.document.title, 'a custom title');

		component.adjective = 'different';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.title, 'a different title');
	}
};
