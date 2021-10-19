export default {
	props: {
		animals: [ 'alpaca', 'baboon', 'capybara' ]
	},

	html: `
		<p>alpaca</p>
		<p>baboon</p>
		<p>capybara</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.animals = [];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>no animals</p>
		` );

		// trigger an 'update' of the else block, to ensure that
		// non-existent update method is not called
		component.animals = [];
		compileOptions.accessorsAsync ? flush() : null;

		component.animals = ['wombat'];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>wombat</p>
		` );

		component.animals = ['dinosaur'];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>dinosaur</p>
		` );
	}
};
