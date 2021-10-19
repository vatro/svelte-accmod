export default {
	props: {
		x: true,
		value: 'one'
	},

	html: `
		<div>
			<input>
			<span>x</span>
		</div>
	`,

	test({ component, target, flush, compileOptions }) {
		const div = target.querySelector('div');

		div.appendChild = div.insertBefore = () => {
			throw new Error('DOM was mutated');
		};

		component.value = 'two';
		compileOptions.accessorsAsync ? flush() : null;
	}
};
