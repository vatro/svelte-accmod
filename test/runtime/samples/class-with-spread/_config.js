export default {
	props: {
		myClass: 'one two',
		attributes: {
			role: 'button'
		}
	},

	html: '<div class="one two" role="button"></div>',

	test({ assert, component, target, flush }) {
		component.myClass = 'one';
		flush();
		component.attributes = {
			'aria-label': 'Test'
		};
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div class="one" aria-label="Test"></div>
		`);
	}
};
