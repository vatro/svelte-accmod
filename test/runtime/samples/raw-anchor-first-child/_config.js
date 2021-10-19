export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target, flush, compileOptions }) {
		const span = target.querySelector('span');
		assert.ok(!span.previousSibling);

		component.raw = '<span>bar</span>';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><span>bar</span></div>');
	}
};
