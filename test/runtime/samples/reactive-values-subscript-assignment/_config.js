export default {
	test({ assert, component, flush, compileOptions }) {
		assert.deepEqual(component.foo, {});
		component.bar = 'hello';
		compileOptions.accessorsAsync ? flush() : null;
		assert.deepEqual(component.foo, { hello: true });
		component.bar = 'world';
		compileOptions.accessorsAsync ? flush() : null;
		assert.deepEqual(component.foo, { hello: true, world: true });
		component.bar = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.deepEqual(component.foo, { hello: true, world: true });
	}
};
