export default {
	props: {
		x: false,
		y: true
	},

	test({ assert, component, target, raf, flush }) {
		// first, toggle x — first element should snap in
		// and out while second one transitions
		component.x = true;
		flush();

		let divs = target.querySelectorAll('div');
		assert.equal(divs[0].foo, undefined);
		assert.equal(divs[1].foo, 0);

		raf.tick(50);
		assert.equal(divs[0].foo, undefined);
		assert.equal(divs[1].foo, 0.5);

		raf.tick(100);

		component.x = false;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<div>snaps if x changes</div>
			<div>transitions if x changes</div>
		`);

		raf.tick(150);
		assert.equal(divs[0].foo, undefined);
		assert.equal(divs[1].foo, 0.5);

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');

		// then toggle y
		component.y = false;
		flush();
		component.x = true;
		flush();
		component.y = true;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>snaps if x changes</div>
			<div>transitions if x changes</div>
		`);
		divs = target.querySelectorAll('div');

		raf.tick(250);
		assert.equal(divs[0].foo, 0.5);
		assert.equal(divs[1].foo, 0.5);

		raf.tick(300);
		assert.equal(divs[0].foo, 1);
		assert.equal(divs[1].foo, 1);

		component.y = false;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<div>snaps if x changes</div>
			<div>transitions if x changes</div>
		`);

		raf.tick(320);
		assert.equal(divs[0].foo, 0.8);
		assert.equal(divs[1].foo, 0.8);

		raf.tick(400);
		assert.htmlEqual(target.innerHTML, '');
	}
};
