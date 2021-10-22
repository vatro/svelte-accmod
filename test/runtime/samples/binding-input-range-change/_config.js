export default {
	props: {
		count: 42
	},

	html: `
		<input type=range>
		<p>number 42</p>
	`,

	ssrHtml: `
		<input type=range value=42>
		<p>number 42</p>
	`,

	async test({ assert, component, target, window, flush }) {
		const input = target.querySelector('input');
		assert.equal(input.value, '42');

		const event = new window.Event('change');

		input.value = '43';
		await input.dispatchEvent(event);

		assert.equal(component.count, 43);
		flush();
		assert.htmlEqual(target.innerHTML, `
			<input type='range'>
			<p>number 43</p>
		`);

		component.count = 44;
		flush();
		assert.equal(input.value, '44');
		assert.htmlEqual(target.innerHTML, `
			<input type='range'>
			<p>number 44</p>
		`);
	}
};
