export default {
	props: {
		thePromise: 'not actually a promise'
	},

	html: `
		<p>the value is not actually a promise</p>
	`,

	test({ assert, component, target, flush }) {
		component.thePromise = 'still not a promise';
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>the value is still not a promise</p>
		`);
	}
};
