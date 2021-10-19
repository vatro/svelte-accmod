export default {
	html: '<h1>Hello world!</h1>',

	test({ assert, component, target, flush, compileOptions }) {
		component.name = () => 'everybody';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual( target.innerHTML, '<h1>Hello everybody!</h1>' );
	}
};
