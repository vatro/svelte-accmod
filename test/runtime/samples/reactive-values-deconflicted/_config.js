export default {
	html: '<span>waiting</span>',

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 'ready';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<span>ready</span>
		`);
	}
};
