export default {
	props: {
		animals: ['alpaca', 'baboon', 'capybara']
	},

	html: '(alpaca)(baboon)(capybara)',

	test({ assert, component, target, flush }) {
		component.animals = ['caribou', 'dogfish'];
		flush();
		assert.htmlEqual(target.innerHTML, '(caribou)(dogfish)');
		component.animals = [];
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
