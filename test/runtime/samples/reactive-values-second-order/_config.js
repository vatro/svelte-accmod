export default {

	test({ assert, component, flush, compileOptions }) {
		assert.equal(component.qux, 2);

		component.foo = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.qux, 4);
	}
};
