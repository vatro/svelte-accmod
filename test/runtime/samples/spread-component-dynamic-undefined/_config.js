export default {
	props: {
		props: {
			a: 1
		}
	},

	html: '',

	test({ assert, component, target, flush }) {
		component.props = {
			a: 2
		};
		flush();

		assert.htmlEqual(target.innerHTML, '');
	}
};
