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
		component.animals = [ 'alpaca', 'baboon', 'caribou', 'dogfish' ];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>alpaca</p>
			<p>baboon</p>
			<p>caribou</p>
			<p>dogfish</p>
		` );

		component.animals = [];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '' );
	}
};
