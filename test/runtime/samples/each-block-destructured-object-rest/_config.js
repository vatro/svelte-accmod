export default {
	props: {
		animalEntries: [
			{ animal: 'raccoon', class: 'mammal' },
			{ animal: 'eagle', class: 'bird' }
		]
	},

	html: `
		<p class="mammal">raccoon</p>
		<p class="bird">eagle</p>
	`,

	test({ assert, component, target, flush }) {
		component.animalEntries = [{ animal: 'cow', class: 'mammal' }];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p class="mammal">cow</p>
		`);
	}
};
