export default {
	props: {
		foo: true,
		bar: true,
		myClass: 'one two'
	},

	html: '<div class="one two foo bar"></div>',

	test({ assert, component, target, flush }) {
		component.foo = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div class="one two bar"></div>
		`);
	}
};
