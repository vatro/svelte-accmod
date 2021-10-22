export default {
	props: {
		thePromise: new Promise(_ => { })
	},

	html: `
		loading...
	`,

	async test({ assert, component, target, flush }) {
		async function a1() {
			component.thePromise = Promise.resolve({ error: 'error message' });
			flush();
		}

		await a1();

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>error: error message</p>
				<p>result: undefined</p>
			`
		);

		async function a2() {
			component.thePromise = Promise.resolve({ result: '42' });
			flush();
		}

		await a2();

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>error: undefined</p>
				<p>result: 42</p>
			`
		);

		async function a3() {
			component.thePromise = Promise.reject({
				error: { message: 'oops', code: '123' }
			});
			flush();
		}

		try {
			await a3();
		} catch (e) {
			// do nothing
		}

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>message: oops</p>
				<p>code: 123</p>
			`
		);

		async function a4() {
			component.thePromise = Promise.reject({
				error: { message: 'timeout', code: '456' }
			});
			flush();
		}

		try {
			await a4();
		} catch (e) {
			// do nothing
		}

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>message: timeout</p>
				<p>code: 456</p>
			`
		);
	}
};
