export default {
	props: {
		x: true
	},

	html: `
		<p>foo</p>
		<input>
	`,

	async test({ assert, component, target, window, flush }) {
		let input = target.querySelector('input');
		input.value = 'abc';
		await input.dispatchEvent(new window.Event('input'));

		assert.equal(component.y, 'abc');

		component.x = false;
		flush();

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
