export default {
	accessors: false,
	test({ assert, component, flush }) {
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);
		assert.equal(component.bar, undefined);
		component.foo1 = null;
		flush();
		component.foo2 = null;
		flush();
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);
	}
};
