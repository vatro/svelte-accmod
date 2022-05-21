let clicked = false;
function handler() {
	clicked = true;
}

export default {
	props: {
		tag: 'div',
		handler
	},
	html: '<div>Foo</div>',

	test({ assert, component, target, flush }) {
		assert.equal(clicked, false);

		component.tag = 'button';
		flush();

		const button = target.querySelector('button');
		const click = new window.MouseEvent('click');
		button.dispatchEvent(click);

		assert.equal(clicked, true);
	}
};
