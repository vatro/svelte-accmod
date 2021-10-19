export default {
	html: `
		<p>count: 0</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.count = 5;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>count: 5</p>
		`);

		component.count = 50;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>count: 9</p>
		`);
	}
};
