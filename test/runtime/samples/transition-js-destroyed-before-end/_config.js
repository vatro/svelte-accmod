export default {
	props: {
		visible: true
	},

	test({ assert, component, target, raf, flush }) {
		component.visible = false;
		flush();
		const div = target.querySelector('div');

		raf.tick(50);
		assert.equal(div.foo, 0.5);

		component.$destroy();

		raf.tick(100);
	}
};
