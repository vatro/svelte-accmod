export default {
	props: {
		name: 'world'
	},

	test({ assert, component, target, raf, flush }) {
		global.count = 0;

		component.visible = true;
		flush();
		assert.equal(global.count, 1);
		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(75);
		component.name = 'everybody';
		flush();
		assert.equal(div.foo, 0.75);
		assert.htmlEqual(div.innerHTML, 'hello everybody!');

		component.visible = false;
		flush();
		component.name = 'again';
		flush();
		assert.htmlEqual(div.innerHTML, 'hello everybody!');

		raf.tick(125);
		assert.equal(div.foo, 0.25);

		component.visible = true;
		flush();
		raf.tick(175);
		assert.equal(div.foo, 0.75);
		assert.htmlEqual(div.innerHTML, 'hello again!');

		raf.tick(200);
		assert.equal(div.foo, 1);

		raf.tick(225);
	}
};
