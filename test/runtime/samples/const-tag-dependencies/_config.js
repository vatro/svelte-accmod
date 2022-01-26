export default {
	html: `
		<div>7</div>
	`,
	async test({ component, target, assert, flush }) {
		component.a = 5;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>9</div>
		`);
	}
};
