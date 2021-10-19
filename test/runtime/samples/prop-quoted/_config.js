export default {
	props: {
		foo: 1
	},

	html: '1',

	async test({ assert, component, target, flush, compileOptions }) {
		component.foo = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '2');
	}
};
