export default {
	props: {
		foo: true
	},

	html: '<div>A wild component appears</div>',

	test({ assert, component, target, flush }) {
		component.foo = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
