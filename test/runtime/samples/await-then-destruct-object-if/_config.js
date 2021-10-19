export default {
	props: {
		thePromise: Promise.resolve({ result: 1 })
	},

	html: '',

	async test({ assert, component, target, flush, compileOptions }) {

		async function a1() {
			component.thePromise = Promise.resolve({ result: 1 });
			compileOptions.accessorsAsync ? flush() : null;
		}

		await a1();

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>result: 1</p>
				<p>count: 0</p>
			`
		);

		await new Promise(resolve => setTimeout(resolve, 1));

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>result: 1</p>
				<p>count: 1</p>
			`
		);
	}
};
