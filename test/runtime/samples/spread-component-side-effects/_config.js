export default {
	props: {},

	html: `
		<div><p>i: 1</p>
		<p>foo: foo</p>
		<p>qux: named</p>
	`,

	test({ assert, component, target, flush }) {
		component.foo = 'lol';
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div><p>i: 2</p>
			<p>foo: lol</p>
			<p>qux: named</p>
		`);
	}
};
