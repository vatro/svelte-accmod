export default {
	html: '<p>0</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.selected = 3;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>3</p>');
	}
};
