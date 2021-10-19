export default {
	props: {
		foo: ['a'],
		bar: ['c']
	},

	html: `
		<svg>
			<g class='foo'>a</g>
			<g class='bar'>c</g>
		</svg>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = ['a', 'b'];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<svg>
				<g class='foo'>a</g>
				<g class='foo'>b</g>
				<g class='bar'>c</g>
			</svg>
		`);
	}
};
