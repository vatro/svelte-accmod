export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(50);
		assert.equal(div.foo, 0);

		raf.tick(100);
		assert.equal(div.foo, 0.5);

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(125);
		assert.equal(div.foo, 0.75);

		raf.tick(150);
		assert.equal(div.foo, 1);

		raf.tick(175);
		assert.equal(div.foo, 0.75);

		raf.tick(250);
		assert.equal(div.foo, 0);
	}
};
