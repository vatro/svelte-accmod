export default {
	props: { foo: null },

	html: 'foo is null',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = 42;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'foo is 42');

		component.foo = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'foo is null');
	}
};
