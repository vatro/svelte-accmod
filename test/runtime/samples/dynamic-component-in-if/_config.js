export default {
	html: `
		<p>Foo</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = component.Bar;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Bar</p>
		`);
	}
};
