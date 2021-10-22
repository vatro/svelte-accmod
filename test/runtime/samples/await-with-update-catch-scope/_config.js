export default {
	props: {
		thePromise: new Promise((_) => { })
	},

	html: `
		<div>error: undefined</div>
	`,

	async test({ assert, component, target, flush }) {
		async function a1() {
			component.thePromise = Promise.resolve('abc');
			flush();
		}

		await a1();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				error: undefined
				After Resolve: undefined
			</div>
			`
		);

		component.error = 'external error occurred';
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				error: ${component.error}
				After Resolve: ${component.error}
			</div>
			`
		);

		async function a2() {
			component.thePromise = Promise.reject('failure');
			flush();
		}

		try {
			await a2();
		} catch (error) {
			// ignore
		}

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>
				error: ${component.error}
				Rejected: failure
			</div>
			`
		);
	}
};
