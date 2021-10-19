export default {
	html: `
		<div>A wild component appears</div>
		<p>x</p>
		<input type=text>
	`,

	ssrHtml: `
		<div>A wild component appears</div>
		<p>x</p>
		<input type=text value=x>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 'y';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>A wild component appears</div>
			<p>y</p>
			<input type=text>
		`);
	}
};
