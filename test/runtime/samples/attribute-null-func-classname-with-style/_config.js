export default {
	props: {
		testName: 'testClassName'
	},

	html: '<div class="testClassName svelte-x1o6ra"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'testClassName svelte-x1o6ra');

		component.testName = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, ' svelte-x1o6ra');

		component.testName = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, ' svelte-x1o6ra');

		component.testName = undefined + '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'undefined svelte-x1o6ra');

		component.testName = null + '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'null svelte-x1o6ra');

		component.testName = 1;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '1 svelte-x1o6ra');

		component.testName = 0;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '0 svelte-x1o6ra');

		component.testName = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'false svelte-x1o6ra');

		component.testName = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'true svelte-x1o6ra');

		component.testName = {};
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '[object Object] svelte-x1o6ra');

		component.testName = '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, ' svelte-x1o6ra');
	}
};
