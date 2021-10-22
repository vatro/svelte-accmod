export default {
	html: `
		<p>nothing</p>
		<p>after</p>
	`,

	test({ assert, component, target, flush }) {
		component.visible = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');

		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>nothing</p>
			<p>after</p>
		`);
	}
};
