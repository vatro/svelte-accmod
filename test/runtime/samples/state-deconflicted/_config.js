export default {
	props: {
		state: 'deconflicted',
		states: [
			'Alabama',
			'Alaska',
			'Arizona',
			'Arkansas',
			'...and some others'
		]
	},

	html: `
		<p>Current state: deconflicted</p>

		<ul>
			<li>Alabama</li>
			<li>Alaska</li>
			<li>Arizona</li>
			<li>Arkansas</li>
			<li>...and some others</li>
		</ul>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.states = [
			'Maine',
			'Maryland',
			'Massachusetts',
			'Michigan',
			'Minnesota',
			'Mississippi',
			'Missouri',
			'Montana'
		];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual( target.innerHTML, `
			<p>Current state: deconflicted</p>

			<ul>
				<li>Maine</li>
				<li>Maryland</li>
				<li>Massachusetts</li>
				<li>Michigan</li>
				<li>Minnesota</li>
				<li>Mississippi</li>
				<li>Missouri</li>
				<li>Montana</li>
			</ul>
		` );
	}
};
