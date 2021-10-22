export default {
	props: {
		foo: true,
		bar: true
	},

	html: '<div class="foo bar"></div>',

	test({ assert, component, target, flush }) {
		component.foo = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div class="bar"></div>
		`);
	}
};
