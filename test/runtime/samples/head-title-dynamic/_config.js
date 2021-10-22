export default {
	props: {
		adjective: 'custom'
	},

	test({ assert, component, window, flush }) {
		assert.equal(window.document.title, 'a custom title');

		component.adjective = 'different';
		flush();
		assert.equal(window.document.title, 'a different title');
	}
};
