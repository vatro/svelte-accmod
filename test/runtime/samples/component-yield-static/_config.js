export default {
	html: `
		<b>Hello</b>
	`,

	test({ assert, component, target, flush }) {
		component.name = 'World';
		flush();
		assert.htmlEqual(target.innerHTML, `
			<b>Hello</b> World
		` );
	}
};
