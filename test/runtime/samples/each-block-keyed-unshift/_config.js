export default {
	props: {
		titles: [{ name: 'b' }, { name: 'c' }]
	},

	html: `
		<p>b</p>
		<p>c</p>
	`,

	test({ assert, component, target, flush }) {
		component.titles = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>a</p>
			<p>b</p>
			<p>c</p>
		`);
	}
};
