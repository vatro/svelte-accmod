export default {
	html: `
		<p>1 / 1</p>
	`,

	test({ assert, component, target, flush }) {
		component.num = 3;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>3 / 3</p>
		`);

		component.num = 2;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>2 / 3</p>
		`);
	}
};
