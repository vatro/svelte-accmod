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

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');
	}
};
