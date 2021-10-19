export default {
	html: `
		<div><span>hello</span> John</div>
		<div><span>hello</span> Jill</div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.names = component.names.reverse();
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div><span>hello</span> Jill</div>
			<div><span>hello</span> John</div>
		`);
	}
};
