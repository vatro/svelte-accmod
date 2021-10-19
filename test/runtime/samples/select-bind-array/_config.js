const items = [ { id: 'a' }, { id: 'b' } ];

export default {
	skip_if_ssr: true,

	props: {
		foo: 'b',
		items
	},

	test({ assert, component, target, flush, compileOptions }) {
		const options = target.querySelectorAll( 'option' );

		assert.equal( options[0].selected, false );
		assert.equal( options[1].selected, true );

		component.foo = items[0].id;
		compileOptions.accessorsAsync ? flush() : null;

		assert.equal( options[0].selected, true );
		assert.equal( options[1].selected, false );
	}
};
