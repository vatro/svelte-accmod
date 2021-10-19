export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;

		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(50);
		assert.equal(div.foo, 0.5);
	}
};
