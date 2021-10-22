export default {
	props: {
		a: true,
		b: false
	},

	html: '<p>i am visible</p>',

	test({ assert, component, target, flush }) {
		component.a = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');
		component.b = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>i am visible</p>');
	}
};
