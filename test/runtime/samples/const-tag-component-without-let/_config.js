export default {
	html: `
		<div>static dynamic</div>
		<div>static dynamic</div>
		<div>static dynamic</div>
	`,
	async test({ component, target, assert, flush, compileOptions }) {
		component.props = 'xxx';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>static xxx</div>
			<div>static xxx</div>
			<div>static xxx</div>
		`);
	}
};
