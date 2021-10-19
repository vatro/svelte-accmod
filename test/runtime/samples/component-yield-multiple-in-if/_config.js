export default {
	html: `
		<div><p class='widget'>Hello</p></div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.arriving = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, "<div><p class='widget'>Goodbye</p></div>");
	}
};
