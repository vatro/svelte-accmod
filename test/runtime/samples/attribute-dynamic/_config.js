export default {
	html: '<div style="color: red;">red</div>',

	test({ assert, component, target, flush }) {
		const div = target.querySelector('div');

		assert.equal(div.style.color, 'red');

		component.color = 'blue';
		flush();
		assert.equal(target.innerHTML, '<div style="color: blue;">blue</div>');
		assert.equal(div.style.color, 'blue');
	}
};
