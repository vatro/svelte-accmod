export default {
	props: {
		testName1: 'test1',
		testName2: 'test2'
	},

	html: '<div class="test1test2 svelte-x1o6ra"></div>',

	test({ assert, component, target, flush }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'test1test2 svelte-x1o6ra');

		component.testName1 = null;
		component.testName2 = null;
		flush();
		assert.equal(div.className, '0 svelte-x1o6ra');

		component.testName1 = null;
		component.testName2 = 'test';
		flush();
		assert.equal(div.className, 'nulltest svelte-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 'test';
		flush();
		assert.equal(div.className, 'undefinedtest svelte-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = undefined;
		flush();
		assert.equal(div.className, 'NaN svelte-x1o6ra');

		component.testName1 = null;
		component.testName2 = 1;
		flush();
		assert.equal(div.className, '1 svelte-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 1;
		flush();
		assert.equal(div.className, 'NaN svelte-x1o6ra');

		component.testName1 = null;
		component.testName2 = 0;
		flush();
		assert.equal(div.className, '0 svelte-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 0;
		flush();
		assert.equal(div.className, 'NaN svelte-x1o6ra');
	}
};
