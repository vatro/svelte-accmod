export default {
	html: '',

	test({ assert, component, target, window, flush, compileOptions }) {
		component.active = 'default';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(target.querySelector('input[title="default"]'), window.document.activeElement);

		component.active = 'dynamic-false';
		compileOptions.accessorsAsync ? flush() : null;
		assert.notEqual(target.querySelector('input[title="dynamic-false"]'), window.document.activeElement);

		// when dynamically set autofocus to true, don't autofocus
		component.autofocusFalse = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.notEqual(target.querySelector('input[title="dynamic-false"]'), window.document.activeElement);

		component.active = 'dynamic-true';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(target.querySelector('input[title="dynamic-true"]'), window.document.activeElement);

		component.active = 'spread';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(target.querySelector('input[title="spread"]'), window.document.activeElement);

		component.active = 'spread-override';
		compileOptions.accessorsAsync ? flush() : null;
		assert.notEqual(target.querySelector('input[title="spread-override"]'), window.document.activeElement);
	}
};
