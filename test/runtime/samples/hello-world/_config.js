export default {
	props: {
		name: 'world'
	},

	html: '<h1>Hello world!</h1>',

	test({ assert, component, target, flush }) {
		component.name = 'everybody';
		flush();
		assert.htmlEqual(target.innerHTML, '<h1>Hello everybody!</h1>');

		component.$destroy();
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
