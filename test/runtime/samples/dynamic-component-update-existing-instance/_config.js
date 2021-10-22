export default {
	props: {
		x: 1
	},

	html: `
		<p>Foo 1</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = 2;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Foo 2</p>
		`);
	}
};
