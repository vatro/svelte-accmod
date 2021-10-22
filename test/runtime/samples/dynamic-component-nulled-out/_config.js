export default {
	html: `
		<p>Foo</p>
	`,

	test({ assert, component, target, flush }) {
		const Bar = component.Bar;

		component.Bar = null;
		flush();

		assert.htmlEqual(target.innerHTML, '');

		component.Bar = Bar;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Foo</p>
		`);
	}
};
