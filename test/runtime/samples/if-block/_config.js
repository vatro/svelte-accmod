export default {
	props: {
		visible: true
	},

	html: '<p>i am visible</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '' );
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '<p>i am visible</p>' );
	}
};
