export default {
	html: `
		JohnJill
	`,

	test({ assert, component, target, flush }) {
		component.names = component.names.reverse();
		flush();
		assert.htmlEqual(target.innerHTML, 'JillJohn');
	}
};
