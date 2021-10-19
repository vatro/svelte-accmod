import container from './container.js';

export default {
	test({ assert, component, target, flush, compileOptions }) {
		container.div = null;

		const div = target.querySelector('div');

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(container.div, div);
	}
};
