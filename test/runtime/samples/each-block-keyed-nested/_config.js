export default {
	html: `
		1
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.desks = [
			{
				id: 1,
				teams: []
			}
		];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '');
	}
};
