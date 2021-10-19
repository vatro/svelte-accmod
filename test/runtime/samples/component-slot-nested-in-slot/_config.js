export default {
	html: `
		<p slot='one'>one: 1 two: 2</p>
	`,
	test({ assert, component, target, flush, compileOptions }) {
		component.a = 3;
		compileOptions.accessorsAsync ? flush() : null;
		component.b = 4;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p slot='one'>one: 3 two: 4</p>
		`);

		component.a = 5;
		compileOptions.accessorsAsync ? flush() : null;
		component.b = 6;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p slot='one'>one: 5 two: 6</p>
		`);
	}
};
