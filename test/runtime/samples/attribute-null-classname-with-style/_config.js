export default {
	html: '<div class=" svelte-x1o6ra"></div>',

	test({ assert, component, target, flush }) {
		const div = target.querySelector('div');

		component.testName = null;
		flush();
		assert.equal(div.className, ' svelte-x1o6ra');

		component.testName = undefined;
		flush();
		assert.equal(div.className, ' svelte-x1o6ra');

		component.testName = undefined + '';
		flush();
		assert.equal(div.className, 'undefined svelte-x1o6ra');

		component.testName = null + '';
		flush();
		assert.equal(div.className, 'null svelte-x1o6ra');

		component.testName = 1;
		flush();
		assert.equal(div.className, '1 svelte-x1o6ra');

		component.testName = 0;
		flush();
		assert.equal(div.className, '0 svelte-x1o6ra');

		component.testName = false;
		flush();
		assert.equal(div.className, 'false svelte-x1o6ra');

		component.testName = true;
		flush();
		assert.equal(div.className, 'true svelte-x1o6ra');

		component.testName = {};
		flush();
		assert.equal(div.className, '[object Object] svelte-x1o6ra');

		component.testName = '';
		flush();
		assert.equal(div.className, ' svelte-x1o6ra');

		component.testName = 'testClassName';
		flush();
		assert.equal(div.className, 'testClassName svelte-x1o6ra');
	}
};
