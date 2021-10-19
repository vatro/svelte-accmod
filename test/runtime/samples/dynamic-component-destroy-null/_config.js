export default {
	props: {
		x: true
	},

	test({ component, flush, compileOptions }) {
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;
	}
};
