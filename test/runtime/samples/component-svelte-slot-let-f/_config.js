export default {
	html: `
		<span class="1">1</span>
		0
	`,
	async test({ assert, target, component, window, flush, compileOptions }) {
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<span class="2">2</span>
			0
		`);

		const span = target.querySelector('span');
		await span.dispatchEvent(new window.MouseEvent('click'));

		assert.htmlEqual(target.innerHTML, `
			<span class="2">2</span>
			2
		`);
	}
};
