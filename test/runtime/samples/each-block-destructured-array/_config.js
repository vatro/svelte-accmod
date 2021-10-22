export default {
	props: {
		animalPawsEntries: [
			['raccoon', 'hands'],
			['eagle', 'wings']
		]
	},

	html: `
		<p>raccoon: hands</p>
		<p>eagle: wings</p>
	`,

	test({ assert, component, target, flush }) {
		component.animalPawsEntries = [['foo', 'bar']];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>foo: bar</p>
		`);
	}
};
