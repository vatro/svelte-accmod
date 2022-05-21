export default {
	props: {
		tag: 'div'
	},
	html: '<div style="color: red;">Foo</div>',

	test({ assert, component, target, flush }) {
		component.tag = 'h1';
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1 style="color: red;">Foo</h1>
		`
		);
	}
};
