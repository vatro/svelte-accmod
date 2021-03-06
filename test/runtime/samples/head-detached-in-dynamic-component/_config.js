export default {
	html: `
		A
	`,

	test({ assert, component, window, flush }) {
		component.x = false;
		flush();

		const meta = window.document.querySelectorAll('meta');

		assert.equal(meta.length, 1);
		assert.equal(meta[0].name, 'description');
		assert.equal(meta[0].content, 'B');
	}
};
