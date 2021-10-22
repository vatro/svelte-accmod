import container from './container.js';

export default {
	test({ assert, component, target, flush }) {
		container.div = null;

		const div = target.querySelector('div');

		component.visible = false;
		flush();
		assert.equal(container.div, div);
	}
};
