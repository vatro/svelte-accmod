export default {
	props: {
		visible: true
	},

	html: `
		before
		<p>Widget</p>
		after
	`,

	test({ assert, component, target, flush }) {
		component.visible = false;
		flush();
		assert.htmlEqual(target.innerHTML, `
			before

			after
		` );

		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			before
			<p>Widget</p>
			after
		` );
	}
};
