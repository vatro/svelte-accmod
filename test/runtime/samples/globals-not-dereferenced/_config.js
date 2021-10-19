export default {
	props: {
		x: 10
	},

	html: '5',

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 3;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '3' );
	}
};
