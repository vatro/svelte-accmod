export default {
	props: {
		a: true,
		b: false
	},

	html: '<p>i am visible</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.a = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '' );
		component.b = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '<p>i am visible</p>' );
	}
};
