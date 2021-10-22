export default {
	props: {
		x: true,
		foo: 'one'
	},

	html: `
		<p>green one</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>red one</p>
		`);

		component.foo = 'two';
		flush();
		component.x = true;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>green two</p>
		`);
	}
};
