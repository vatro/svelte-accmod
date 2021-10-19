export default {
	props: {
		myClass: 'one two'
	},

	html: '<div class="one two three"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.myClass = 'one';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div class="one three"></div>
		`);
	}
};
