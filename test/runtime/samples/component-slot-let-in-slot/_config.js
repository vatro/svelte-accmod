export default {
	props: {
		prop: 'a'
	},

	html: 'a',

	test({ assert, component, target, flush, compileOptions }) {
		component.prop = 'b';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, 'b' );
	}
};
