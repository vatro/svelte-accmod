export default {
	props: {
		a: 1,
		b: 2
	},
	html: '<p>1 + 2 = 3</p>',
	test({ assert, component, target, flush, compileOptions }) {
		component.a = 3;
		compileOptions.accessorsAsync ? flush() : null;
		component.b = 4;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal( target.innerHTML, '<p>3 + 4 = 7</p>' );
	}
};
