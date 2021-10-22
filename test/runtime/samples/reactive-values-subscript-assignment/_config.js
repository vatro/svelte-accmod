export default {
	test({ assert, component, flush }) {
		assert.deepEqual(component.foo, {});
		component.bar = 'hello';
		flush();
		assert.deepEqual(component.foo, { hello: true });
		component.bar = 'world';
		flush();
		assert.deepEqual(component.foo, { hello: true, world: true });
		component.bar = false;
		flush();
		assert.deepEqual(component.foo, { hello: true, world: true });
	}
};
