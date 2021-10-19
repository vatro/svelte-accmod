export default {
	props: {
		condition: false
	},

	test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.document.title, '');
		assert.equal(Boolean(window.document.getElementById('meta')), true);

		component.condition = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.title, 'woo!!!');
		assert.equal(window.document.getElementById('meta'), null);
	}
};
