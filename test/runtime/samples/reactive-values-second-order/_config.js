export default {

	test({ assert, component, flush }) {
		assert.equal(component.qux, 2);

		component.foo = 2;
		flush();
		assert.equal(component.qux, 4);
	}
};
