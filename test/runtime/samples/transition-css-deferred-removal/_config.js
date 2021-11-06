export default {
	props: {
		visible: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		const outer = target.querySelector('.outer');
		const inner = target.querySelector('.inner');

		const animations = [
			outer.style.animation,
			inner.style.animation
		];

		raf.tick(150);

		assert.deepEqual([
			outer.style.animation,
			inner.style.animation
		], animations);
	}
};
