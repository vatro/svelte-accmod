export default {
	html: '<div><p></p></div>',

	test({ assert, component, target, flush, compileOptions }) {
		const { widget } = component;

		assert.equal(widget.show, false);

		widget.show = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><p>Hello</p></div>');

		component.data = 'World';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><p>World</p></div>');

		widget.show = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><p></p></div>');

		component.data = 'Goodbye';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><p></p></div>');

		widget.show = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><p>Goodbye</p></div>');
	}
};
