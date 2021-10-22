export default {
	props: {
		x: false,
		things: ['a']
	},

	test({ assert, component, target, raf, flush }) {
		component.x = true;
		flush();

		const div = target.querySelector('div');
		assert.equal(div.foo, 0);

		raf.tick(100);
		assert.equal(div.foo, 1);

		component.x = false;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');

		raf.tick(150);
		assert.equal(div.foo, 0.5);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
