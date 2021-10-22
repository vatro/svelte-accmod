import { destroyed, reset } from './destroyed.js';

export default {
	test({ assert, component, flush }) {
		// for hydration, ssr may have pushed to `destroyed`
		reset();

		component.visible = false;
		flush();
		assert.deepEqual(destroyed, ['A', 'B', 'C']);

		reset();
	}
};
