export default {
	html: `
		1
	`,

	test({ assert, component, target, flush }) {
		component.desks = [
			{
				id: 1,
				teams: []
			}
		];
		flush();

		assert.htmlEqual(target.innerHTML, '');
	}
};
