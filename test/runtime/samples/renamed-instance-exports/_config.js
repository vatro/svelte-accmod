export default {
	test({ assert, component, flush, compileOptions }) {
		assert.equal(component.bar1, 42);
		assert.equal(component.bar2, 42);
		component.bar1 = 100;
		compileOptions.accessorsAsync ? flush() : null;
		component.bar2 = 100;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.bar1, 42);
		assert.equal(component.bar2, 100);
	}
};
