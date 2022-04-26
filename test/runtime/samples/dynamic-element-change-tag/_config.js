export default {
	props: {
		tag: 'div',
	},
	html: '<div>Foo</div>',

	test({ assert, component, target, flush }) {
		component.tag = 'h1';
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1>Foo</h1>
		`
		);
	},
};
