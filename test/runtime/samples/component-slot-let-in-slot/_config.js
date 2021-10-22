export default {
	props: {
		prop: 'a'
	},

	html: 'a',

	test({ assert, component, target, flush }) {
		component.prop = 'b';
		flush();
		assert.htmlEqual(target.innerHTML, 'b');
	}
};
