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

	test({ assert, component, target, flush }) {
		fulfil(42);

		return thePromise
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<div><p>the value is 42</p></div>
				`);

				component.show = false;
				flush();
				assert.htmlEqual(target.innerHTML, '<div></div>');

				component.show = true;
				flush();
				assert.htmlEqual(target.innerHTML, `
					<div><p>the value is 42</p></div>
				`);
			});
	}
};
