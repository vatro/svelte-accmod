export default {
	html: 'b baz',
	test({ assert, component, target, flush, compileOptions }) {
		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(
			target.innerHTML,
			'a baz'
		);
	}
};
