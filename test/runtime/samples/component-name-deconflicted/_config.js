export default {
	html: `
		<span>1</span>
		<span>2</span>
	`,

	test({ assert, component, target, flush }) {
		component.list = [3, 4];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<span>3</span>
			<span>4</span>
		`);
	}
};
