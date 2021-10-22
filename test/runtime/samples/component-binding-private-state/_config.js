export default {
	html: `
		<p>Foo: yes</p>
		<p>x in parent: undefined</p>
	`,

	async test({ assert, component, target, flush }) {
		component.a = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: no</p>
			<p>x in parent: undefined</p>
		`);

		component.a = true;
		flush();
		assert.equal(component.x, undefined);
		component.x = 'maybe';
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Foo: yes</p>
			<p>x in parent: maybe</p>
		`);

		component.a = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: no</p>
			<p>x in parent: maybe</p>
		`);
	}
};
