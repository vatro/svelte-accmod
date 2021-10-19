export default {

	test({ component, flush, compileOptions }) {
		// Would cause "TypeError: Cannot read property 'o' of undefined"
		component.foo = false;
		compileOptions.accessorsAsync ? flush() : null;
	}
};
