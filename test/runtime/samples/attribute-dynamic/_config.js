export default {
	html: '<div style="color: red;">red</div>',

	test({ assert, component, target, flush, compileOptions }) {
		const div = target.querySelector( 'div' );

		assert.equal( div.style.color, 'red' );

		component.color = 'blue';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal( target.innerHTML, '<div style="color: blue;">blue</div>' );
		assert.equal( div.style.color, 'blue' );
	}
};
