export default {
	skip_if_ssr: true, // TODO delete this line, once binding works

	html: `
		<p>y: bar</p>
		<p>y: bar</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>y: bar</p>
			<p>y: bar</p>
		`);
	}
};
