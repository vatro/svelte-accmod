export default {
	props: {
		primary: true
	},

	html: '<div class="test-class primary" role="button"></div>',

	test({ assert, component, target, flush }) {
		component.primary = true;
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="test-class primary" role="button"></div>
		`
		);
	}
};
