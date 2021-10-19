export default {
	props: {
		visible: true
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		const span = target.querySelector('span');

		raf.tick(50);
		assert.equal(span.foo, 0.5);

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(span.foo, 1);

		raf.tick(75);
		assert.equal(span.foo, 1);

		raf.tick(100);
		assert.htmlEqual(target.innerHTML, `
			<span>hello</span>
		`);
	}
};
