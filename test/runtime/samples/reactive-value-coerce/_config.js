export default {
	html: '1-1',

	test: ({ assert, component, target, flush }) => {
		component.a.b[0] = 2;
		flush();
		component.a = component.a; // eslint-disable-line no-self-assign
		flush();

		assert.htmlEqual(target.innerHTML, '2-2');
	}
};
