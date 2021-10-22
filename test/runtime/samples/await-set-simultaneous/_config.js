export default {
	test({ assert, component, target, flush }) {
		const promise = Promise.resolve().then(() => {
			component.answer = 42;
		});

		component.promise = promise;
		flush();

		assert.htmlEqual(target.innerHTML, '<p>wait for it...</p>');

		return promise
			.then(() => {
				assert.htmlEqual(target.innerHTML, `
					<p>the answer is 42!</p>
				`);
			});
	}
};
