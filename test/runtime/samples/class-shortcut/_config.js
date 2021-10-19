export default {
	props: {
		foo: true,
		bar: true
	},

	html: '<div class="foo bar"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div class="bar"></div>
		`);
	}
};
