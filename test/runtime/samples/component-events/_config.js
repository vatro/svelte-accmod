export default {
	props: {
		visible: true
	},

	html: '<div><p>i am a widget</p></div>',

	test({ assert, component, flush, compileOptions }) {
		let count = 0;

		component.$on('widgetTornDown', function() {
			assert.equal(this, component);
			count += 1;
		});

		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(count, 1);

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(count, 2);
	}
};
