export default {
	props: {
		foo: true
	},

	html: 'foo',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'bar');
	}
};
