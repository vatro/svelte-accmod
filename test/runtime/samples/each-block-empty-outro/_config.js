export default {
	props: {
		visible: true,
		empty: []
	},

	html: `
		<div>
			<p>text</p>
		</div>
	`,

	test({ assert, component, target, flush }) {
		component.visible = false;
		flush();

		assert.htmlEqual(target.innerHTML, '');
	}
};
