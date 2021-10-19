export default {
	props: {
		myClass: 'one two',
		attributes: {
			role: 'button'
		}
	},

	html: '<div class="one two" role="button"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.myClass = 'one';
		compileOptions.accessorsAsync ? flush() : null;
		component.attributes = {
			'aria-label': 'Test'
		};
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div class="one" aria-label="Test"></div>
		`);
	}
};
