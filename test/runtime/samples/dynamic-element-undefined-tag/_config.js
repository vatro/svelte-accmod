export default {
	html: '',
	test({ component, target, assert, flush, compileOptions }) {
		component.tag = 'h1';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '<h1>Foo</h1>');

		component.tag = null;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');

		component.tag = 'div';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '<div>Foo</div>');

		component.tag = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');

		component.tag = 'span';
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(target.innerHTML, '<span>Foo</span>');
	}
};
