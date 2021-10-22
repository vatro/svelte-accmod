export default {
	html: '<div id="foo"></div>',

	test({ assert, component, target, flush }) {
		component.id = 'bar';
		flush();
		assert.equal(target.innerHTML, '<div id="bar"></div>');
	}
};
