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

	test({ assert, component, target, flush }) {
		fulfil(42);

		return thePromise
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<p>the value is 42</p>
				`);

				component.show = false;
				flush();

				assert.htmlEqual(target.innerHTML, `
					<p>Else</p>
				`);

				component.show = true;
				flush();

				return thePromise.then(() => {
					assert.htmlEqual(target.innerHTML, `
						<p>the value is 42</p>
					`);
				});
			});
	}
};
