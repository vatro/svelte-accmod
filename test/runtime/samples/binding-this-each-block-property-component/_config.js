export default {
	html: '',

	async test({ assert, component, target, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>a</p>
		`);

		assert.ok(component.items[0].ref.isFoo());
	}
};
