export default {
	props: {
		things: [ 'a', 'b', 'c' ]
	},


	test({ assert, component, target, raf, flush, compileOptions }) {
		const divs = target.querySelectorAll( 'div' );

		component.things = [ 'a' ];
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick( 50 );
		assert.equal( divs[0].foo, undefined );
		assert.equal( divs[1].foo, 0.5 );
		assert.equal( divs[2].foo, 0.5 );

		raf.tick( 100 );
		assert.htmlEqual(target.innerHTML, '<div>a</div>');
	}
};
