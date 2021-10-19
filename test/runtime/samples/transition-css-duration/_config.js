export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		const div = target.querySelector('div');

		raf.tick(25);

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(26);
		assert.ok(~div.style.animation.indexOf('25ms'));
	}
};
