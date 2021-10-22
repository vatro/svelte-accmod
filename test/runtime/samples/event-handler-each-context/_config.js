export default {
	props: {
		items: [
			'whatever'
		],
		foo: 'wrong',
		bar: 'right'
	},

	test({ assert, component, target, window, flush }) {
		const button = target.querySelector('button');
		const event = new window.MouseEvent('click');

		button.dispatchEvent(event);
		assert.equal(component.foo, 'right');

		component.bar = 'left';
		flush();
		button.dispatchEvent(event);
		assert.equal(component.foo, 'left');
	}
};
