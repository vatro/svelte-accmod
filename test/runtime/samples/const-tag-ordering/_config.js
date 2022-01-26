export default {
	html: `
		<div>4 ^ 4 = 256</div>
	`,
	async test({ component, target, assert, flush }) {
		component.value = 3;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>3 ^ 4 = 81</div>
		`);
	}
};
