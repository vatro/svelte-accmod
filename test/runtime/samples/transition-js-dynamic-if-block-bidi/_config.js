export default {
	props: {
		name: 'world'
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		global.count = 0;

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(global.count, 1);
		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(75);
		component.name = 'everybody';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.foo, 0.75);
		assert.htmlEqual(div.innerHTML, 'hello everybody!');

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		component.name = 'again';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(div.innerHTML, 'hello everybody!');

		raf.tick(125);
		assert.equal(div.foo, 0.25);

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		raf.tick(175);
		assert.equal(div.foo, 0.75);
		assert.htmlEqual(div.innerHTML, 'hello again!');

		raf.tick(200);
		assert.equal(div.foo, 1);

		raf.tick(225);
	}
};
