export default {
	html: '',

	async test({ assert, component, target, flush, compileOptions}) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>a</div>
		`);

		assert.equal(component.items[0].ref, target.querySelector('div'));
	}
};
