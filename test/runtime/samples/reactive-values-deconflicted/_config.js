export default {
	html: '<span>waiting</span>',

	test({ assert, component, target, flush }) {
		component.x = 'ready';
		flush();
		assert.htmlEqual(target.innerHTML, `
			<span>ready</span>
		`);
	}
};
