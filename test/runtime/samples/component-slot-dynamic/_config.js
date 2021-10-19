export default {
	html: `
		<p>override default slot</p>
	`,

	test({ component, flush, compileOptions }) {
		component.nested.foo = 'b';
		compileOptions.accessorsAsync ? flush() : null;
	}
};
