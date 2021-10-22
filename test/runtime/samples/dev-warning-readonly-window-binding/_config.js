export default {
	compileOptions: {
		dev: true
	},

	test({ assert, component, flush }) {
		try {
			component.width = 99;
			flush();
			throw new Error('Expected an error');
		} catch (err) {
			assert.equal(err.message, "<Main>: Cannot set read-only property 'width'");
		}
	}
};
