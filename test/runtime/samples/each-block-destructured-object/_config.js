export default {
	props: {
		animalPawsEntries: [
			{ animal: 'raccoon', pawType: 'hands' },
			{ animal: 'eagle', pawType: 'wings' }
		]
	},

	html: `
		<p>raccoon: hands</p>
		<p>eagle: wings</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.animalPawsEntries = [{ animal: 'cow', pawType: 'hooves' }];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, `
			<p>cow: hooves</p>
		`);
	}
};
