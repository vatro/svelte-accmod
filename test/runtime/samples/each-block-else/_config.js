export default {
	props: {
		animals: ['alpaca', 'baboon', 'capybara'],
		foo: 'something else'
	},

	html: `
		before
		<p>alpaca</p>
		<p>baboon</p>
		<p>capybara</p>
		after
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.animals = [];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before
			<p>no animals, but rather something else</p>
			after
		`);

		component.foo = 'something other';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before
			<p>no animals, but rather something other</p>
			after
		`);

		component.animals = ['wombat'];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before
			<p>wombat</p>
			after
		`);
	}
};
