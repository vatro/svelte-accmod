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
	`,

	test({ assert, component, target, flush }) {
		const html = `
			<div><p>foo: undefined</p>
			<p>baz: undefined</p>
			<p>qux: named</p>
		`;

		// test undefined
		component.props = undefined;
		flush();
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		flush();
		assert.htmlEqual(target.innerHTML, this.html);

		// test null
		component.props = null;
		flush();
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		flush();
		assert.htmlEqual(target.innerHTML, this.html);

		// test boolean
		component.props = true;
		flush();
		assert.htmlEqual(target.innerHTML, html);

		// set object props
		component.props = this.props.props;
		flush();
		assert.htmlEqual(target.innerHTML, this.html);

		// test number
		component.props = 123;
		flush();
		assert.htmlEqual(target.innerHTML, html);

	}
};
