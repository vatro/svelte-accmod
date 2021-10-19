export default {
	props: {
		visible: true,
		things: ['a', 'b', 'c']
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
			<div>b</div>
			<div>c</div>
		`);

		component.things = ['a'];
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
		`);

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, '');
	}
};
