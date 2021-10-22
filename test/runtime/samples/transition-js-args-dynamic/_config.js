export default {

	test({ assert, component, target, raf, flush }) {
		component.visible = true;
		flush();

		const div = target.querySelector('div');

		assert.equal(div.value, 0);

		raf.tick(200);

		div.value = 'test';
		component.visible = false;
		flush();
		assert.equal(div.value, 'test');
	}
};
