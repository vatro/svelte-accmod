export default {
	props: {
		props: {
			a: 1
		}
	},

	html: '',

	test({ assert, component, target, flush, compileOptions }) {
		component.props = {
			a: 2
		};
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');
	}
};
