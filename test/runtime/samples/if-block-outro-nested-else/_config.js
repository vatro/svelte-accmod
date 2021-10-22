export default {

	test({ component, flush }) {
		// Would cause "TypeError: Cannot read property 'o' of undefined"
		component.foo = false;
		flush();
	}
};
