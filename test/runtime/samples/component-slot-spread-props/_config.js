export default {
	html: `
		<div>
			<input />
			<div class="foo"></div>
		</div>
	`,
	ssrHtml: `
		<div>
			<input value="" />
			<div class="foo"></div>
		</div>
	`,

	async test({ assert, component, target, flush }) {
		component.value = 'foo';
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>
				<input />
				<div class="foo"></div>
			</div>
		`);
	}
};
