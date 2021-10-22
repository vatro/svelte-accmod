export default {
	props: {
		animals: ['alpaca', 'baboon', 'capybara']
	},

	html: `
		<p>alpaca</p>
		<p>baboon</p>
		<p>capybara</p>
	`,

	test({ assert, component, target, flush }) {
		component.animals = [];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>no animals</p>
		` );

		// trigger an 'update' of the else block, to ensure that
		// non-existent update method is not called
		component.animals = [];
		flush();

		component.animals = ['wombat'];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>wombat</p>
		` );

		component.animals = ['dinosaur'];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>dinosaur</p>
		` );
	}
};
