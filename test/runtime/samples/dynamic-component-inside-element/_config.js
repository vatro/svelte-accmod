export default {
	props: {
		x: true
	},

	html: `
		<div><p>true, therefore Foo</p></div>
	`,

	test({ assert, component, target, flush }) {
		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div><p>false, therefore Bar</p></div>
		`);
	}
};
