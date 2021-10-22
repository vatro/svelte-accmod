export default {
	skip_if_ssr: true, // uses oncreate

	html: '<div><p>true</p></div>',

	test({ assert, component, target, flush }) {
		component.foo = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p>true</p>\n<p>true</p></div>');
	}
};
