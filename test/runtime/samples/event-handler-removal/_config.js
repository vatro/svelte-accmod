// TODO gah, JSDOM appears to behave differently to real browsers here... probably need to raise an issue

export default {
	html: '<input>',

	test({ assert, component, flush }) {
		component.input.focus();

		// this should NOT trigger blur event
		component.visible = false;
		flush();
		assert.ok(!component.blurred);

		component.visible = true;
		flush();
		component.input.focus();

		// this SHOULD trigger blur event
		component.input.blur();
		assert.ok(component.blurred);
	}
};
