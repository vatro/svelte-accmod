export default {
	props: {
		bar: 'lol',
		x: 2,
		compound: 'piece of',
		go: { deeper: 'core' }
	},

	html: `
		<div><p>foo: lol</p>
		<p>baz: 42 (number)</p>
		<p>qux: this is a piece of string</p>
		<p>quux: core</p></div>
	`,

	test({ assert, component, target, flush }) {
		component.bar = 'wut';
		flush();
		component.x = 3;
		flush();
		component.compound = 'rather boring';
		flush();
		component.go = { deeper: 'heart' };
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div><p>foo: wut</p>
			<p>baz: 43 (number)</p>
			<p>qux: this is a rather boring string</p>
			<p>quux: heart</p></div>
		`);
	}
};
