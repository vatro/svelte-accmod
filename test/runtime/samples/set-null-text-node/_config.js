export default {
	props: { foo: null },

	html: 'foo is null',

	test({ assert, component, target, flush }) {
		component.foo = 42;
		flush();
		assert.htmlEqual(target.innerHTML, 'foo is 42');

		component.foo = null;
		flush();
		assert.htmlEqual(target.innerHTML, 'foo is null');
	}
};
