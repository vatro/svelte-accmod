export default {
	html: `
		<p>1 + 2 = 3</p>
		<p>3 * 3 = 9</p>
	`,

	test({ assert, component, target, flush }) {
		component.a = 3;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>3 + 2 = 5</p>
			<p>5 * 5 = 25</p>
		`);
	}
};
