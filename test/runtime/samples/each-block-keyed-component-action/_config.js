export default {
	test({ assert, component, flush, compileOptions }) {
		assert.equal(component.count, 0);

		component.arr = ['2'];
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(component.count, 1);

		component.arr = ['1', '2'];
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(component.count, 2);

		component.arr = ['2', '1'];
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(component.count, 2);

		component.arr = [];
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal(component.count, 0);
	}
};
