export default {
	skip: true, // nice-to-have – tricky though, so skipping for now

	test({ component, flush, compileOptions }) {
		component.foo = { x: 2 };
		compileOptions.accessorsAsync ? flush() : null;
	}
};
