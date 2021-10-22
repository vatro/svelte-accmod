export default {
	html: `
		<p>disabled</p>
		<p>unconditional</p>`,

	test({ assert, component, target, flush }) {
		component.enabled = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>enabled</p>
			<p>unconditional</p>
		`);
	}
};
