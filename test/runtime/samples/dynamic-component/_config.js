export default {
	props: {
		x: true
	},

	html: `
		<p>true, therefore Foo</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>false, therefore Bar</p>
		`);
	}
};
