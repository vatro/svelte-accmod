export default {
	html: `
		<p>1 / 1</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.num = 3;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>3 / 3</p>
		`);

		component.num = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>2 / 3</p>
		`);
	}
};
