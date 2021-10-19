export default {
	props: {
		foo: true,
		bar: true,
		myClass: 'one two'
	},

	html: '<div class="one two foo bar"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div class="one two bar"></div>
		`);
	}
};
