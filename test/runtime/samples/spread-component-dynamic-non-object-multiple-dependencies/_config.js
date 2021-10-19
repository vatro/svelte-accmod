export default {
	props: {
		props: {
			foo: 'lol',
			baz: 40 + 2
		}
	},

	html: `
		<div><p>foo: lol</p>
		<p>baz: 42</p>
		<p>qux: named</p>
		<p>corge: b</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		const html = `
			<div><p>foo: undefined</p>
			<p>baz: undefined</p>
			<p>qux: named</p>
			<p>corge: b</p>
		`;

		// test undefined
		component.props = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, this.html);

		// test null
		component.props = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, this.html);

		// test boolean
		component.props = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, this.html);

		// test number
		component.props = 123;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, html);

	}
};
