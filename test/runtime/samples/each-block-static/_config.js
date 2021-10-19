export default {
	props: {
		items: []
	},

	html: '',

	test({ assert, component, target, flush, compileOptions }) {
		component.items = ['x'];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'foo');
	}
};
