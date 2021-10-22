export default {
	props: {
		x: 1,
		y: false
	},

	html: `
		<span>1</span>
	`,

	test({ assert, component, target, flush }) {
		component.x = 2;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<span>2</span>
		`);
	}
};
