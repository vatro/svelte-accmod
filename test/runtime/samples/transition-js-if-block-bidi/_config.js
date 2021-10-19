export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		global.count = 0;

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(global.count, 1);
		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(300);
		assert.equal(div.foo, 0.75);

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(global.count, 1);

		raf.tick(500);
		assert.equal(div.foo, 0.25);

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		raf.tick(700);
		assert.equal(div.foo, 0.75);

		raf.tick(800);
		assert.equal(div.foo, 1);

		raf.tick(900);
	}
};
