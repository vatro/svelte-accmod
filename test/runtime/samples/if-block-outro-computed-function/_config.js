export default {
	props: {
		foo: true
	},

	html: 'foo',

	test({ assert, component, target, flush }) {
		component.foo = false;
		flush();
		assert.htmlEqual(target.innerHTML, 'bar');
	}
};
