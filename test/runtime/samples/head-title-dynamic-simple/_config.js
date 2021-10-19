export default {
	props: {
		foo: 'A Title'
	},

	test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.document.title, 'A Title');

		component.foo = 'Also A Title';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.title, 'Also A Title');
	}
};
