export default {
	props: {
		visible: true
	},

	html: `
		before
		<p>Widget</p>
		after
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			before

			after
		` );

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			before
			<p>Widget</p>
			after
		` );
	}
};
