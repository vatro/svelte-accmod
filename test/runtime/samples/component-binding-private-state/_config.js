export default {
	html: `
		<p>Foo: yes</p>
		<p>x in parent: undefined</p>
	`,

	async test({ assert, component, target, flush, compileOptions }) {
		component.a = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: no</p>
			<p>x in parent: undefined</p>
		`);

		component.a = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.x, undefined);
		component.x = 'maybe';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Foo: yes</p>
			<p>x in parent: maybe</p>
		`);

		component.a = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: no</p>
			<p>x in parent: maybe</p>
		`);
	}
};
