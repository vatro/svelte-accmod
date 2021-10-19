export default {
	accessors: false,
	test({ assert, component, flush, compileOptions }) {
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);
		assert.equal(component.bar, undefined);
		component.foo1 = null;
		compileOptions.accessorsAsync ? flush() : null;
		component.foo2 = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);
	}
};
