export default {
	test({ assert, target, component, flush }) {
		assert.htmlEqual(target.innerHTML, '<span></span>');
		component.enabled = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<span>enabled</span>');
	}
};
