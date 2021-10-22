export default {
	props: {
		foo: 'A Title'
	},

	test({ assert, component, window, flush }) {
		assert.equal(window.document.title, 'A Title');

		component.foo = 'Also A Title';
		flush();
		assert.equal(window.document.title, 'Also A Title');
	}
};
