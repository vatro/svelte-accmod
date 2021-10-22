export default {
	props: {
		props: {
			a: 1
		}
	},

	html: `
		<p>a: 1</p>
	`,

	test({ assert, component, target, flush }) {
		component.props = {
			a: 2
		};
		flush();

		assert.htmlEqual(target.innerHTML, '<p>a: 2</p>');
	}
};
