export default {
	props: {
		x: 10
	},

	html: 'potato',

	test({ assert, component, target, flush }) {
		component.x = 3;
		flush();
		assert.htmlEqual(target.innerHTML, 'potato');
	}
};
