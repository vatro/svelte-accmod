export default {
	// in 'accmod' 'accessors' are always set to 'true'
	//accessors: false, // -> original test
	test({ assert, component, flush }) {
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);

		// 'component.bar' should be undefined (original test) only if 'accessors:false' (original test),
		// in 'accmod' with 'accessors' always set to 'true', 'component.bar' should be '42'
		assert.equal(component.bar, 42); 

		component.foo1 = null;
		flush();
		component.foo2 = null;
		flush();
		assert.equal(component.foo1, 42);
		assert.equal(component.foo2(), 42);
	}
};
