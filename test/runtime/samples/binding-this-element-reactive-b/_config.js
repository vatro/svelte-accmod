export default {
	skip_if_ssr: true,

	html: `
		<div>The text is hello</div>
		<h1>hello</h1>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>The text is missing</div>
		`);

		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>The text is hello</div>
			<h1>hello</h1>
		`);
	}
};
