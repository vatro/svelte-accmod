export default {
	html: `
		<p>count: 0</p>
	`,

	test({ assert, component, target, flush }) {
		component.count = 5;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>count: 5</p>
		`);

		component.count = 50;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>count: 9</p>
		`);
	}
};
