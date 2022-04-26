export default {
	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;

		const h1 = target.querySelector('h1');
		assert.equal(h1.style.animation, '__svelte_3809512021_0 100ms linear 0ms 1 both');

		raf.tick(150);
		component.tag = 'h2';
		compileOptions.accessorsAsync ? flush() : null;

		const h2 = target.querySelector('h2');
		assert.equal(h1.style.animation, '');
		assert.equal(h2.style.animation, '');

		raf.tick(50);
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.equal(h2.style.animation, '__svelte_3750847757_0 100ms linear 0ms 1 both');
	}
};
