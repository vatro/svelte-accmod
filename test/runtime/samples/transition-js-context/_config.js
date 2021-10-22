export default {

	test({ assert, component, target, raf, flush }) {
		component.visible = true;
		flush();

		const div = target.querySelector('div');
		assert.equal(div.foo, 42);

		raf.tick(50);
		assert.equal(div.foo, 42);
	}
};
