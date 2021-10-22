export default {
	test({ assert, component, flush }) {
		assert.equal(component.count, 0);

		component.arr = ['2'];
		flush();

		assert.equal(component.count, 1);

		component.arr = ['1', '2'];
		flush();

		assert.equal(component.count, 2);

		component.arr = ['2', '1'];
		flush();

		assert.equal(component.count, 2);

		component.arr = [];
		flush();

		assert.equal(component.count, 0);
	}
};
