export default {
	props: {
		tag: 'div'
	},
	html: '<div style="color: red;">Foo</div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.tag = 'h1';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1 style="color: red;">Foo</h1>
		`
		);
	}
};
