export default {
	props: {
		x: false,
		y: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;

		let div = target.querySelector('div');
		assert.equal(div.foo, undefined);

		component.y = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div></div>');
		div = target.querySelector('div');

		raf.tick(50);
		assert.equal(div.foo, 0.5);

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, '');

		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;
		component.y = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '');

		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div></div>');
		div = target.querySelector('div');

		component.y = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div></div>');

		raf.tick(150);
		assert.equal(div.foo, 0.5);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
