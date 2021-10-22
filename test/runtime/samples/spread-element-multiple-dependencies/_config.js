export default {
	html: "<div class='b' title='baz'></div>",
	test({ assert, component, target, flush }) {
		component.foo = true;
		flush();
		assert.htmlEqual(
			target.innerHTML,
			"<div class='a' title='baz'></div>"
		);
	}
};
