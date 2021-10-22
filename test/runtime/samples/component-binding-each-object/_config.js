export default {
	props: {
		a: [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]
	},

	html: `
		<span>foo</span><span>bar</span><span>baz</span>
	`,

	test({ assert, component, target, flush }) {
		component.a = [
			{ id: 'yep' },
			{ id: 'nope' }
		];

		flush();
		assert.htmlEqual(target.innerHTML, `
			<span>yep</span><span>nope</span>
		`);
	}
};
