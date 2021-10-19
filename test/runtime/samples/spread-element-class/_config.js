export default {
	html: "<div class='foo bar'>hello</div>",
	test({ assert, component, target, flush, compileOptions }) {
		component.blah = 'goodbye';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, "<div class='foo bar'>goodbye</div>");
	}
};
