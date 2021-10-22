export default {
	html: '<div><p></p></div>',

	test({ assert, component, target, flush }) {
		const { widget } = component;

		assert.equal(widget.show, false);

		widget.show = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p>Hello</p></div>');

		component.data = 'World';
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p>World</p></div>');

		widget.show = false;
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p></p></div>');

		component.data = 'Goodbye';
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p></p></div>');

		widget.show = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div><p>Goodbye</p></div>');
	}
};
