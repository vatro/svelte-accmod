export default {
	props: {
		x: true
	},

	html: `
		<button>select foo</button>
	`,

	test({ assert, component, target, window, flush }) {
		const click = new window.MouseEvent('click');

		target.querySelector('button').dispatchEvent(click);
		assert.equal(component.selected, 'foo');

		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<button>select bar</button>
		`);

		target.querySelector('button').dispatchEvent(click);
		assert.equal(component.selected, 'bar');
	}
};
