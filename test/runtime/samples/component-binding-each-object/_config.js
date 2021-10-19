export default {
	props: {
		a: [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }]
	},

	html: `
		<span>foo</span><span>bar</span><span>baz</span>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.a = [
			{ id: 'yep' },
			{ id: 'nope' }
		];

		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<span>yep</span><span>nope</span>
		`);
	}
};
