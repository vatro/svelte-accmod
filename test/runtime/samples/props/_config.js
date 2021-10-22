export default {
	props: {
		x: 1
	},

	html: `
		<p>{"x":1}</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = 2;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>{"x":2}</p>
		`);
	}
};
