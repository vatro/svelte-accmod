export default {
	html: 'one',

	test({ assert, component, target, flush }) {
		component.text = 'two';
		flush();
		assert.htmlEqual(target.innerHTML, 'two');
	}
};
