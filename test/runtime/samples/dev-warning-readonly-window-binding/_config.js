export default {
	compileOptions: {
		dev: true
	},

	test({ assert, component, flush, compileOptions }) {
		try {
			component.width = 99;
			compileOptions.accessorsAsync ? flush() : null;
			throw new Error('Expected an error');
		} catch (err) {
			assert.equal(err.message, "<Main>: Cannot set read-only property 'width'");
		}
	}
};
