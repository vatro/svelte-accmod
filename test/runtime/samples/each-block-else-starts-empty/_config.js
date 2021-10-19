export default {
	props: {
		animals: [],
		foo: 'something else'
	},

	html: `
		before
		<p>no animals, but rather something else</p>
		after
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.animals = ['wombat'];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before
			<p>wombat</p>
			after
		`);
	}
};
