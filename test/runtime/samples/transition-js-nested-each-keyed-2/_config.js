export default {
	props: {
		x: true,
		things: ['a', 'b']
	},

	test({ assert, component, target, flush }) {
		component.x = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
