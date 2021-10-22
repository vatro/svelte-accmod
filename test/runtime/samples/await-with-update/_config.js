export default {
	props: {
		thePromise: new Promise((_) => { }),
		count: 0
	},

	html: `
		<div><p>loading...</p></div>
	`,

	async test({ assert, component, target, flush }) {
		async function a1() {
			component.thePromise = Promise.resolve(component.Component);
			flush();
		}

		await a1();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>Resolved:
				<div>count: 0</div>
			</div>
			`
		);

		component.count = 5;
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>Resolved:
				<div>count: 5</div>
			</div>
			`
		);

		async function a2() {
			component.thePromise = Promise.reject(component.Component);
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
			<div>Rejected:
				<div>count: 5</div>
			</div>
			`
		);

		component.count = 10;
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>Rejected:
				<div>count: 10</div>
			</div>
			`
		);
	}
};
