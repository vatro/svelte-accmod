export default {
	props: {
		todos: [
			{ id: 123, description: 'buy milk' },
			{ id: 234, description: 'drink milk' }
		]
	},

	html: `
		<p>buy milk</p>
		<p>drink milk</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		const [ p1, p2 ] = target.querySelectorAll('p');

		component.todos = [
			{ id: 123, description: 'buy beer' },
			{ id: 234, description: 'drink beer' }
		];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>buy beer</p>
			<p>drink beer</p>
		`);

		const [ p3, p4 ] = target.querySelectorAll('p');

		assert.equal(p1, p3);
		assert.equal(p2, p4);
	}
};
