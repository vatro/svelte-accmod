export default {
	html: '',

	async test({ assert, component, target, flush }) {
		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
		`);

		assert.equal(component.items[0].ref, target.querySelector('div'));
	}
};
