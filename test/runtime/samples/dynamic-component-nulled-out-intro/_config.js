export default {
	test({ component, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
	}
};
