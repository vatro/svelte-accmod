export default {
	html: '',

	async test({ assert, component, target, flush }) {
		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>a</p>
		`);

		assert.ok(component.items[0].ref.isFoo());
	}
};
