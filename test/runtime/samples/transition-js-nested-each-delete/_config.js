export default {
	props: {
		visible: true,
		things: ['a', 'b', 'c']
	},

	test({ assert, component, target, raf, flush }) {
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
			<div>b</div>
			<div>c</div>
		`);

		component.things = ['a'];
		flush();

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
		`);

		component.visible = false;
		flush();

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
