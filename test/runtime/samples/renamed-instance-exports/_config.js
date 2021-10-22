export default {
	test({ assert, component, flush }) {
		assert.equal(component.bar1, 42);
		assert.equal(component.bar2, 42);
		component.bar1 = 100;
		flush();
		component.bar2 = 100;
		flush();
		assert.equal(component.bar1, 42);
		assert.equal(component.bar2, 100);
	}
};
