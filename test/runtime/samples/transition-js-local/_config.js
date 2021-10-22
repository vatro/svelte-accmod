export default {
	props: {
		x: false,
		y: true
	},

	test({ assert, component, target, raf, flush }) {
		component.x = true;
		flush();

		let div = target.querySelector('div');
		assert.equal(div.foo, undefined);

		component.y = false;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');
		div = target.querySelector('div');

		raf.tick(50);
		assert.equal(div.foo, 0.5);

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, '');

		component.x = false;
		flush();
		component.y = true;
		flush();
		assert.htmlEqual(target.innerHTML, '');

		component.x = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');
		div = target.querySelector('div');

		component.y = false;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');

		raf.tick(120);
		assert.equal(div.foo, 0.8);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
