export default {
	props: {
		x: 10
	},

	html: '5',

	test({ assert, component, target, flush }) {
		component.x = 3;
		flush();
		assert.htmlEqual(target.innerHTML, '3');
	}
};
