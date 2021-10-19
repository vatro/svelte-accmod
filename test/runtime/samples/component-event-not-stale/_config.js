export default {
	props: {
		value: 1
	},

	test({ assert, component, target, window, flush, compileOptions }) {
		const buttons = target.querySelectorAll('button');
		const click = new window.MouseEvent('click');

		const events = [];
		component.$on('value', event => {
			events.push(event.detail);
		});

		buttons[0].dispatchEvent(click);
		buttons[1].dispatchEvent(click);

		component.value = 2;
		compileOptions.accessorsAsync ? flush() : null;

		buttons[0].dispatchEvent(click);
		buttons[1].dispatchEvent(click);

		assert.deepEqual(events, [
			{ value: 1 },
			{ value: 1 },
			{ value: 2 },
			{ value: 2 }
		]);
	}
};
