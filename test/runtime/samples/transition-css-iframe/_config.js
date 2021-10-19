export default {
	skip_if_ssr: true,

	async test({ assert, component, target, raf, flush, compileOptions }) {
		const frame = target.querySelector('iframe');
		await Promise.resolve();

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		const div = frame.contentDocument.querySelector('div');

		raf.tick(25);

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(26);
		assert.ok(~div.style.animation.indexOf('25ms'));
	}
};
