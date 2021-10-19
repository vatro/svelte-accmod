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

	async test({ assert, component, target, flush, compileOptions }) {
		component.value = 'foo';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>
				<input />
				<div class="foo"></div>
			</div>
		`);
	}
};
