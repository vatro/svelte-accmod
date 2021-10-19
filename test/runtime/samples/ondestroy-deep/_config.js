import { destroyed, reset } from './destroyed.js';

export default {
	test({ assert, component, flush, compileOptions }) {
		// for hydration, ssr may have pushed to `destroyed`
		reset();

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.deepEqual(destroyed, ['A', 'B', 'C']);

		reset();
	}
};
