export default {
	props: {
		items: [
			'whatever'
		],
		foo: 'wrong',
		bar: 'right'
	},

	test({ assert, component, target, window, flush, compileOptions }) {
		const button = target.querySelector('button');
		const event = new window.MouseEvent('click');

		button.dispatchEvent(event);
		assert.equal(component.foo, 'right');

		component.bar = 'left';
		compileOptions.accessorsAsync ? flush() : null;
		button.dispatchEvent(event);
		assert.equal(component.foo, 'left');
	}
};
