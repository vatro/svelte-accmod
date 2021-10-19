let fulfil;

let thePromise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		thePromise
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

				let reject;

				thePromise = new Promise((f, r) => {
					reject = r;
				});

				component.thePromise = thePromise;
				compileOptions.accessorsAsync ? flush() : null;

				assert.htmlEqual(target.innerHTML, `
					<div><p>loading...</p></div>
				`);

				reject(new Error('something broke'));

				return thePromise.catch(() => {});
			})
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<div><p>oh no! something broke</p></div>
				`);
			});
	}
};
