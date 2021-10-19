export default {
	html: `
		<p>1 + 2 = 3</p>
		<p>Times calculated: 1</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.a = 3;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>3 + 2 = 5</p>
			<p>Times calculated: 2</p>
		`);
	}
};
