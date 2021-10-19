export default {
	html: `
		JohnJill
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.names = component.names.reverse();
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, 'JillJohn');
	}
};
