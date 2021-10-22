export default {
	html: "<div class='foo bar'>hello</div>",
	test({ assert, component, target, flush }) {
		component.blah = 'goodbye';
		flush();
		assert.htmlEqual(target.innerHTML, "<div class='foo bar'>goodbye</div>");
	}
};
