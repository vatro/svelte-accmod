export default {
	compileOptions: {
		dev: true
	},

	props: {
		a: 42
	},

	test({ assert, component, flush }) {
		try {
			component.foo = 1;
			flush();
			throw new Error('Expected an error');
		} catch (err) {
			assert.equal(err.message, "<Main>: Cannot set read-only property 'foo'");
		}
	}
};
