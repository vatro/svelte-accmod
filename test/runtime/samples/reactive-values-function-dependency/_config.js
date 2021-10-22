export default {
	html: '<p>2</p>',

	test({ assert, component, target, flush }) {
		component.y = 2;
		flush();
		assert.equal(component.x, 4);
		assert.equal(target.innerHTML, '<p>4</p>');
	}
};
