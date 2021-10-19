export default {
	html: '<p>2</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.y = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.x, 4);
		assert.equal(target.innerHTML, '<p>4</p>');
	}
};
