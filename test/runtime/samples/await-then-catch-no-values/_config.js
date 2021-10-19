let fulfil;

let thePromise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		thePromise
	},

	html: 'waiting',

	test({ assert, component, target, flush, compileOptions }) {
		fulfil(9000);

		return thePromise
			.then(() => {
				assert.htmlEqual(target.innerHTML, 'resolved');

				let reject;

				thePromise = new Promise((f, r) => {
					reject = r;
				});

				component.thePromise = thePromise;
				compileOptions.accessorsAsync ? flush() : null;

				assert.htmlEqual(target.innerHTML, 'waiting');

				reject(new Error('something broke'));

				return thePromise.catch(() => {});
			})
			.then(() => {
				assert.htmlEqual(target.innerHTML, 'rejected');
			});
	}
};
