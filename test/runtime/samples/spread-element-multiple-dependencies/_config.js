export default {
	html: "<div class='b' title='baz'></div>",
	test({ assert, component, target, flush, compileOptions }) {
		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(
			target.innerHTML,
			"<div class='a' title='baz'></div>"
		);
	}
};
