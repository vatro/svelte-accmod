export default {
	html: `
		<p style="color: red;"></p>
	`,

	test({ assert, component, target, flush }) {
		component.myColor = 'blue';
		flush();
		assert.htmlEqual(target.innerHTML, '<p style="color: blue;"></p>');
	}
};
