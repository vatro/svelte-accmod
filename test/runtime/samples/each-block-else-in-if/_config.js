export default {
	html: `
		<p>nothing</p>
		<p>after</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '');

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>nothing</p>
			<p>after</p>
		`);
	}
};
