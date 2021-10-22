export default {

	test({ assert, component, target, raf, flush }) {
		component.visible = true;
		flush();
		const div = target.querySelector('div');

		raf.tick(25);

		component.visible = false;
		flush();

		raf.tick(26);
		assert.ok(~div.style.animation.indexOf('25ms'));
	}
};
