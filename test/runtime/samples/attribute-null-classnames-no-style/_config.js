export default {
	props: {
		testName1: 'test1',
		testName2: 'test2'
	},

	html: '<div class="test1test2"></div>',

	test({ assert, component, target, flush }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'test1test2');

		component.testName1 = null;
		component.testName2 = null;
		flush();
		assert.equal(div.className, '0');

		component.testName1 = null;
		component.testName2 = 'test';
		flush();
		assert.equal(div.className, 'nulltest');

		component.testName1 = undefined;
		component.testName2 = 'test';
		flush();
		assert.equal(div.className, 'undefinedtest');

		component.testName1 = undefined;
		component.testName2 = undefined;
		flush();
		assert.equal(div.className, 'NaN');

		component.testName1 = null;
		component.testName2 = 1;
		flush();
		assert.equal(div.className, '1');

		component.testName1 = undefined;
		component.testName2 = 1;
		flush();
		assert.equal(div.className, 'NaN');

		component.testName1 = null;
		component.testName2 = 0;
		flush();
		assert.equal(div.className, '0');

		component.testName1 = undefined;
		component.testName2 = 0;
		flush();
		assert.equal(div.className, 'NaN');
	}
};
