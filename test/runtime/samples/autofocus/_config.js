export default {
	html: '',

	test({ assert, component, target, window, flush }) {
		component.active = 'default';
		flush();
		assert.equal(target.querySelector('input[title="default"]'), window.document.activeElement);

		component.active = 'dynamic-false';
		flush();
		assert.notEqual(target.querySelector('input[title="dynamic-false"]'), window.document.activeElement);

		// when dynamically set autofocus to true, don't autofocus
		component.autofocusFalse = true;
		flush();
		assert.notEqual(target.querySelector('input[title="dynamic-false"]'), window.document.activeElement);

		component.active = 'dynamic-true';
		flush();
		assert.equal(target.querySelector('input[title="dynamic-true"]'), window.document.activeElement);

		component.active = 'spread';
		flush();
		assert.equal(target.querySelector('input[title="spread"]'), window.document.activeElement);

		component.active = 'spread-override';
		flush();
		assert.notEqual(target.querySelector('input[title="spread-override"]'), window.document.activeElement);
	}
};
