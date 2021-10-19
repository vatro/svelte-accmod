let fulfil;

const thePromise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		thePromise,
		show: true
	},

	html: `
		<div><p>loading...</p></div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		fulfil(42);

		return thePromise
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<div><p>the value is 42</p></div>
				`);

				component.show = false;
				compileOptions.accessorsAsync ? flush() : null;
				assert.htmlEqual(target.innerHTML, '<div></div>');

				component.show = true;
				compileOptions.accessorsAsync ? flush() : null;
				assert.htmlEqual(target.innerHTML, `
					<div><p>the value is 42</p></div>
				`);
			});
	}
};
