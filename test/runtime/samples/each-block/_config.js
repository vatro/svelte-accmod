export default {
	props: {
		animals: ['alpaca', 'baboon', 'capybara']
	},

	html: `
		<p>alpaca</p>
		<p>baboon</p>
		<p>capybara</p>
	`,

	test({ assert, component, target, flush }) {
		component.animals = ['alpaca', 'baboon', 'caribou', 'dogfish'];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>alpaca</p>
			<p>baboon</p>
			<p>caribou</p>
			<p>dogfish</p>
		` );

		component.animals = [];
		flush();
		assert.htmlEqual(target.innerHTML, '');
	}
};
