export default {
	html: '<p style="--border-color: red;"></p>',

	test({ assert, component, target, flush }) {
		component.myColor = 'blue';
		flush();

		assert.htmlEqual(target.innerHTML, '<p style="--border-color: blue;"></p>');
	}
};
