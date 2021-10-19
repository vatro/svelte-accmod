export default {
	props: {
		thePromise: 'not actually a promise'
	},

	html: `
		<p>the value is not actually a promise</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.thePromise = 'still not a promise';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>the value is still not a promise</p>
		`);
	}
};
