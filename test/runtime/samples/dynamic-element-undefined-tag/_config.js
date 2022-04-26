export default {
	html: '',
	test({ component, target, assert, flush }) {
		component.tag = 'h1';
		flush();

		assert.htmlEqual(target.innerHTML, '<h1>Foo</h1>');

		component.tag = null;
		flush();

		assert.htmlEqual(target.innerHTML, '');

		component.tag = 'div';
		flush();

		assert.htmlEqual(target.innerHTML, '<div>Foo</div>');

		component.tag = false;
		flush();

		assert.htmlEqual(target.innerHTML, '');

		component.tag = 'span';
		flush();

		assert.htmlEqual(target.innerHTML, '<span>Foo</span>');
	},
};
