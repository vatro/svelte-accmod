export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;

		const div = target.querySelector('div');

		assert.equal(div.value, 0);

		raf.tick(200);

		div.value = 'test';
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.value, 'test');
	}
};
