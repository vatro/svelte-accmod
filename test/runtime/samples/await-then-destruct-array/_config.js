export default {
	props: {
		thePromise: new Promise(_ => {})
	},

	html: `
		loading...
	`,

	async test({ assert, component, target, flush, compileOptions }) {

		async function a1() {
			component.thePromise = Promise.resolve([1, 2]);
			compileOptions.accessorsAsync ? flush() : null;
		}

		await a1();

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>a: 1</p>
				<p>b: 2</p>
			`
		);


		async function a2() {
			component.thePromise = Promise.resolve([4, 5]);
			compileOptions.accessorsAsync ? flush() : null;
		}

		await a2();

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>a: 4</p>
				<p>b: 5</p>
			`
		);


		async function a3() {
			component.thePromise = Promise.reject(['a', [6, 7]]);
			compileOptions.accessorsAsync ? flush() : null;
		}

		try {
			await a3();
		} catch (e) {
			// do nothing
		}

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>c: a</p>
				<p>d: 6</p>
				<p>e: 7</p>
			`
		);

		async function a4() {
			component.thePromise = Promise.reject(['b', [8, 9]]);
			compileOptions.accessorsAsync ? flush() : null;
		}

		try {
			await a4();
		} catch (e) {
			// do nothing
		}

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>c: b</p>
				<p>d: 8</p>
				<p>e: 9</p>
			`
		);

	}
};
