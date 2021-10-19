export default {
	props: {
		tree: [
			{id: 1, sub: null},
			{id: 2, sub: [{id: 11}]}
		]
	},

	html: `
		<div>1</div>
		<div>2\n<div>11</div></div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.tree = [
			{id: 1, sub: null},
			{id: 2, sub: null}
		];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>1</div>
			<div>2</div>
		`);
	}
};
