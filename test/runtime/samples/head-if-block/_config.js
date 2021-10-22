export default {
	props: {
		condition: false
	},

	test({ assert, component, window, flush }) {
		assert.equal(window.document.title, '');

		component.condition = true;
		flush();
		assert.equal(window.document.title, 'woo!!!');
	}
};
