export default {
	html: '<p>0</p>',

	test({ assert, component, target, flush }) {
		component.selected = 3;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>3</p>');
	}
};
