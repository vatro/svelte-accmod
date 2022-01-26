export default {
	html: `
		<p style="color: red;"></p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.myColor = 'blue';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p style="color: blue;"></p>');
	}
};
