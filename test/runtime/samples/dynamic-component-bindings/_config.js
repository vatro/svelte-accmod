export default {
	props: {
		x: true
	},

	html: `
		<p>foo</p>
		<input>
	`,

	async test({ assert, component, target, window, flush, compileOptions }) {
		let input = target.querySelector('input');
		input.value = 'abc';
		await input.dispatchEvent(new window.Event('input'));

		assert.equal(component.y, 'abc');

		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>bar</p>
			<input type='checkbox'>
		`);

		input = target.querySelector('input');
		input.checked = true;
		await input.dispatchEvent(new window.Event('change'));

		assert.equal(component.z, true);
	}
};
