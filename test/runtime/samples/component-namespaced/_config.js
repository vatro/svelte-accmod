export default {
	props: {
		a: 1
	},

	html: `
		<p>foo 1</p>
	`,

	test({ assert, component, target, flush }) {
		component.a = 2;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>foo 2</p>
		`);
	}
};
