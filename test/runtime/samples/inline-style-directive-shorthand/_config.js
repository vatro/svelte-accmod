export default {
	html: `
		<p style="color: red;"></p>
		<p style="color: red;"></p>
	`,

	test({ assert, component, target, window, flush, compileOptions }) {
		const [p1, p2] = target.querySelectorAll('p');

		assert.equal(window.getComputedStyle(p1).color, 'red');
		assert.equal(window.getComputedStyle(p2).color, 'red');

		component.color = 'blue';
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(
			target.innerHTML,
			`
			<p style="color: blue;"></p>
			<p style="color: blue;"></p>
		`
		);

		assert.equal(window.getComputedStyle(p1).color, 'blue');
		assert.equal(window.getComputedStyle(p2).color, 'blue');
	}
};
