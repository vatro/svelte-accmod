export default {
	props: {
		x: false,
		things: ['a']
	},

	test({ assert, component, target, raf, flush }) {
		component.x = true;
		flush();

		const div1 = target.querySelector('div');
		assert.equal(div1.foo, undefined);

		raf.tick(100);
		assert.equal(div1.foo, undefined);

		component.things = ['a', 'b'];
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div><div></div>');

		const div2 = target.querySelector('div:last-child');
		assert.equal(div1.foo, undefined);
		assert.equal(div2.foo, 0);

		raf.tick(200);
		assert.equal(div1.foo, undefined);
		assert.equal(div2.foo, 1);

		component.x = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
