export default {
	html: `
		<p>doubled: 2</p>
	`,

	test({ assert, component, target, flush }) {
		component.a = 2;
		flush();

		assert.equal(component.doubled, 4);
		assert.htmlEqual(target.innerHTML, `
			<p>doubled: 4</p>
		`);

		component.doubled = 3;
		flush();

		assert.equal(component.doubled, 3);
		assert.htmlEqual(target.innerHTML, `
			<p>doubled: 3</p>
		`);
	}
};
