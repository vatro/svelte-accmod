export default {
	props: {
		x: false,
		y: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;

		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(100);
		assert.equal(div.foo, 1);

		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div></div>');

		raf.tick(150);
		assert.equal(div.foo, 0.5);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
