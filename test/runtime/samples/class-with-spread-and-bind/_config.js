export default {
	props: {
		primary: true
	},

	html: '<div class="test-class primary" role="button"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.primary = true;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
			<div class="test-class primary" role="button"></div>
		`
		);
	}
};
