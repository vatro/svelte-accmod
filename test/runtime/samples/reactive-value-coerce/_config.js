export default {
	html: '1-1',

	test: ({ assert, component, target, flush, compileOptions }) => {
		component.a.b[0] = 2;
		compileOptions.accessorsAsync ? flush() : null;
		component.a = component.a; // eslint-disable-line no-self-assign
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '2-2');
	}
};
