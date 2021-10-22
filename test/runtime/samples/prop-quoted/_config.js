export default {
	props: {
		foo: 1
	},

	html: '1',

	async test({ assert, component, target, flush }) {
		component.foo = 2;
		flush();
		assert.htmlEqual(target.innerHTML, '2');
	}
};
