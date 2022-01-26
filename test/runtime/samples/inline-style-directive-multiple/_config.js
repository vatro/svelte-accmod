export default {
	html: `
		<p style="color: red; width: 65px; font-weight: 700;"></p>
	`,

	test({ assert, component, target, window, flush, compileOptions }) {
		const p = target.querySelector('p');

		let styles = window.getComputedStyle(p);
		assert.equal(styles.color, 'red');

		component.myColor = 'pink';
		component.width = '100vh';
		component.absolute = true;
		component.bold = false;
		compileOptions.accessorsAsync ? flush() : null;

		styles = window.getComputedStyle(p);
		assert.htmlEqual(
			target.innerHTML,
			'<p style="color: pink; width: 100vh; font-weight: 100; position: absolute;"></p>'
		);
		assert.equal(styles.color, 'pink');
		assert.equal(styles.width, '100vh');
		assert.equal(styles.fontWeight, '100');
		assert.equal(styles.position, 'absolute');
	}
};
