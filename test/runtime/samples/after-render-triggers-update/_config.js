export default {
	skip_if_ssr: true,

	props: {
		value: 'hello!'
	},

	html: `
		<p>hello!</p>
		<p>hello!</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.value = 'goodbye!';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>goodbye!</p>
			<p>goodbye!</p>
		`);
	}
};
