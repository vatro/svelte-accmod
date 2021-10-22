export default {
	html: `
		<p>override default slot</p>
	`,

	test({ component, flush }) {
		component.nested.foo = 'b';
		flush();
	}
};
