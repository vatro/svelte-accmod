export default {
	html: '<p style="--border-color: red;"></p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.myColor = 'blue';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '<p style="--border-color: blue;"></p>');
	}
};
