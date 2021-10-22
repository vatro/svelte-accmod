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

	test({ assert, component, target, flush }) {
		component.animalPawsEntries = [['foo', 'bar']];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>bar</p>
		`);
	}
};
