export default {

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		const div = target.querySelector('div');

		assert.equal(div.style.animation, '__svelte_3809512021_0 100ms linear 0ms 1 both');

		raf.tick(50);
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		// both in and out styles
		assert.equal(div.style.animation, '__svelte_3809512021_0 100ms linear 0ms 1 both, __svelte_3750847757_0 100ms linear 0ms 1 both');

		raf.tick(75);
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;

		// reset original styles
		assert.equal(div.style.animation, '__svelte_3809512021_0 100ms linear 0ms 1 both');
	}
};
