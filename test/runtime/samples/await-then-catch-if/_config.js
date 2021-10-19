let fulfil;

const thePromise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		show: true,
		thePromise
	},

	html: `
		<p>loading...</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		fulfil(42);

		return thePromise
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<p>the value is 42</p>
				`);

				component.show = false;
				compileOptions.accessorsAsync ? flush() : null;

				assert.htmlEqual(target.innerHTML, `
					<p>Else</p>
				`);

				component.show = true;
				compileOptions.accessorsAsync ? flush() : null;

				return thePromise.then(() => {
					assert.htmlEqual(target.innerHTML, `
						<p>the value is 42</p>
					`);
				});
			});
	}
};
