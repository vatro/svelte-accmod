export default {
	html: 'b baz',
	test({ assert, component, target, flush }) {
		component.foo = true;
		flush();
		assert.htmlEqual(
			target.innerHTML,
			'a baz'
		);
	}
};
