export default {
	props: {
		x: 11
	},

	html: `
		<p>x is greater than 10</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = 4;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>x is less than 5</p>
		`);

		component.x = 6;
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
