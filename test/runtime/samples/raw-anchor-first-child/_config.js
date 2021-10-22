export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target, flush }) {
		const span = target.querySelector('span');
		assert.ok(!span.previousSibling);

		component.raw = '<span>bar</span>';
		flush();
		assert.htmlEqual(target.innerHTML, '<div><span>bar</span></div>');
	}
};
