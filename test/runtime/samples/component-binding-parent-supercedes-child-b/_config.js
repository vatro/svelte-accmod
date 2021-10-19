export default {
	html: `
		<p>Foo: yes</p>
		<p>x in parent: yes</p>
	`,

	async test({ assert, component, target, flush, compileOptions }) {
		component.a = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: yes</p>
			<p>x in parent: yes</p>
		`);

		component.a = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(component.x, 'yes');
		component.x = undefined;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Foo: undefined</p>
			<p>x in parent: undefined</p>
		`);

		component.a = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>Bar: no</p>
			<p>x in parent: no</p>
		`);
	}
};
