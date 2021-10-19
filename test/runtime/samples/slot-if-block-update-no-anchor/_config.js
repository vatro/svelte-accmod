export default {
	test({ assert, target, component, flush, compileOptions }) {
		assert.htmlEqual(target.innerHTML, '<span></span>');
		component.enabled = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<span>enabled</span>');
	}
};
