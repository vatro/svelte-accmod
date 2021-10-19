export default {
	props: {
		animalPawsEntries: [
			['raccoon', 'hands'],
			['eagle', 'wings']
		]
	},

	html: `
		<p>hands</p>
		<p>wings</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.animalPawsEntries = [['foo', 'bar']];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>bar</p>
		`);
	}
};
