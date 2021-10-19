export default {
	props: {
		x: true,
		things: ['a', 'b']
	},

	test({ assert, component, target, flush, compileOptions }) {
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '');
	}
};
