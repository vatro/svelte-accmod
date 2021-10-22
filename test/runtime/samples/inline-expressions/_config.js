export default {
	props: {
		a: 1,
		b: 2
	},
	html: '<p>1 + 2 = 3</p>',
	test({ assert, component, target, flush }) {
		component.a = 3;
		flush();
		component.b = 4;
		flush();
		assert.equal(target.innerHTML, '<p>3 + 4 = 7</p>');
	}
};
