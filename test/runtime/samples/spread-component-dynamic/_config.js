export default {
	props: {
		props: {
			a: 1
		}
	},

	html: `
		<p>a: 1</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.props = {
			a: 2
		};
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '<p>a: 2</p>');
	}
};
