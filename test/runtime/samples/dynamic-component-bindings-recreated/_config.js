export default {
	props: {
		x: true,
		foo: 'one'
	},

	html: `
		<p>green one</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>red one</p>
		`);

		component.foo = 'two';
		compileOptions.accessorsAsync ? flush() : null;
		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>green two</p>
		`);
	}
};
