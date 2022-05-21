export default {
	props: {
		x: false,
		y: 1
	},

	test({ assert, component, target, raf, flush }) {
		component.x = true;
		flush();

		let div = target.querySelector('div');
		assert.equal(div.foo, undefined);

		// play both in and out transition when changed with `{#key}`
		component.y = 2;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div><div></div>');
		const [leaving, incoming] = target.querySelectorAll('div');

		raf.tick(50);
		assert.equal(leaving.foo, 0.5);
		assert.equal(incoming.foo, 0.5);

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, '<div></div>');
		assert.equal(leaving.foo, 0);
		assert.equal(incoming.foo, 1);

		// do not play out transition when removed by `{#if}`
		component.x = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');

		// do not play in transition when added back with `{#if}`
		component.x = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');
		div = target.querySelector('div');
		assert.equal(div.foo, undefined);
	}
};
