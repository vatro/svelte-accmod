export default {
	props: {
		tag: 'div'
	},
	html: '<div>Foo</div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.tag = 'h1';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1>Foo</h1>
		`
		);
	}
};
