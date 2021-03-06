export default {
	props: {
		duration: 200
	},


	test({ assert, component, target, raf, flush }) {
		component.visible = true;
		flush();
		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(50);
		assert.equal(div.foo, 100);

		raf.tick(100);
		assert.equal(div.foo, 200);

		raf.tick(101);
	}
};
