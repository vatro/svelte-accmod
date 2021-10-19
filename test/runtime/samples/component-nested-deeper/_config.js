export default {
	props: {
		values: [1, 2, 3, 4]
	},

	test({ component, flush, compileOptions }) {
		component.values = [2, 3];
		compileOptions.accessorsAsync ? flush() : null;
	}
};
