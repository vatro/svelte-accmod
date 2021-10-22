export default {
	props: {
		props: {
			disabled: true
		}
	},

	html: `
		<button disabled>click me</button>
	`,

	test({ assert, component, target, flush }) {
		const button = target.querySelector('button');

		assert.ok(button.disabled);

		component.props = { disabled: false };
		flush();

		assert.htmlEqual(
			target.innerHTML,
			'<button>click me</button>'
		);
		assert.ok(!button.disabled);
	}
};
