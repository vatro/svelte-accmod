export default {
	html: `
		<p>10 - 90</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.width = 50;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>10 - 40</p>
		`);
	}
};
