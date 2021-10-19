export default {
	props: {
		animals: [ 'alpaca', 'baboon', 'capybara' ]
	},

	html: '(alpaca)(baboon)(capybara)',

	test({ assert, component, target, flush, compileOptions }) {
		component.animals = [ 'caribou', 'dogfish' ];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '(caribou)(dogfish)' );
		component.animals = [];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '' );
	}
};
