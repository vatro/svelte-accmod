export default {
	html: `
		<p>disabled</p>
		<p>unconditional</p>`,

	test({ assert, component, target, flush, compileOptions }) {
		component.enabled = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>enabled</p>
			<p>unconditional</p>
		`);
	}
};
