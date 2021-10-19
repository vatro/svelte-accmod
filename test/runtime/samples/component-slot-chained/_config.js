export default {
	html: 'one',

	test({ assert, component, target, flush, compileOptions }) {
		component.text = 'two';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'two');
	}
};
