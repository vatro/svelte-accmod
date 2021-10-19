export default {
	props: {
		visible: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		const div = target.querySelector('div');

		raf.tick(50);
		assert.equal(div.foo, 0.5);

		component.$destroy();

		raf.tick(100);
	}
};
