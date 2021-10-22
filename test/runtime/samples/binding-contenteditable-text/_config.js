export default {
	props: {
		name: 'world'
	},

	html: `
		<editor contenteditable="true">world</editor>
		<p>hello world</p>
	`,

	async test({ assert, component, target, window, flush }) {
		const el = target.querySelector('editor');
		assert.equal(el.textContent, 'world');

		const event = new window.Event('input');

		el.textContent = 'everybody';
		await el.dispatchEvent(event);

		assert.htmlEqual(target.innerHTML, `
			<editor contenteditable="true">everybody</editor>
			<p>hello everybody</p>
		`);

		component.name = 'goodbye';
		flush();
		assert.equal(el.textContent, 'goodbye');
		assert.htmlEqual(target.innerHTML, `
			<editor contenteditable="true">goodbye</editor>
			<p>hello goodbye</p>
		`);
	}
};
