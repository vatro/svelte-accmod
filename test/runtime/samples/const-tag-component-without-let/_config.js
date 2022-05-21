export default {
	html: `
		<div>static dynamic</div>
		<div>static dynamic</div>
		<div>static dynamic</div>
	`,
	async test({ component, target, assert, flush }) {
		component.props = 'xxx';
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
			<div>static xxx</div>
			<div>static xxx</div>
			<div>static xxx</div>
		`
		);
	}
};
