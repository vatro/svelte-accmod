export default {
	props: {
		x: 10
	},

	html: 'potato',

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 3;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, 'potato' );
	}
};
