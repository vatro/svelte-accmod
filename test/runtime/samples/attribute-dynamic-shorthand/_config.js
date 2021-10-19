export default {
	html: '<div id="foo"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.id = 'bar';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal( target.innerHTML, '<div id="bar"></div>' );
	}
};
