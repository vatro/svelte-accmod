export default {
	props: {
		foo: true
	},

	html: '<div>A wild component appears</div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '');
	}
};
