export default {
	html: `
		One
		Inner
	`,

	test({ assert, component, target, flush }) {
		component.foo = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');

		component.foo = true;
		flush();
		assert.htmlEqual(target.innerHTML, 'One\nInner');
	}
};
