export default {
	props: {
		items: []
	},

	html: '',

	test({ assert, component, target, flush }) {
		component.items = ['x'];
		flush();
		assert.htmlEqual(target.innerHTML, 'foo');
	}
};
