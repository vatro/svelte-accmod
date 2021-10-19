export default {
	props: {
		titles: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
	},

	html: `
		<p>a</p>
		<p>b</p>
		<p>c</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.titles = [{ name: 'b' }, { name: 'c' }];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>b</p>
			<p>c</p>
		`);

		component.titles = [{ name: 'c' }];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>c</p>
		`);

	}
};
