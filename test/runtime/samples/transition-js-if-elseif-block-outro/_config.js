export default {
	props: {
		x: false,
		y: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		assert.equal(target.querySelector('div'), component.no);

		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;
		component.y = false;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(25);
		assert.equal(component.yes.foo, undefined);
		assert.equal(component.no.foo, 0.75);

		raf.tick(75);
		assert.equal(component.yes.foo, undefined);
		assert.equal(component.no.foo, 0.25);

		raf.tick(100);
	}
};
