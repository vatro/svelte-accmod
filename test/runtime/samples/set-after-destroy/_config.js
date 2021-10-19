export default {
	props: {
		x: 1
	},

	test({ component, flush, compileOptions }) {
		component.$destroy();
		component.x = 2;
		compileOptions.accessorsAsync ? flush() : null;
	}
};
