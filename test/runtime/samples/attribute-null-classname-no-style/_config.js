export default {
	props: {
		testName: 'testClassName'
	},

	html: '<div class="testClassName"></div>',

	test({ assert, component, target, flush }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'testClassName');

		component.testName = null;
		flush();
		assert.equal(div.className, '');

		component.testName = undefined;
		flush();
		assert.equal(div.className, '');

		component.testName = undefined + '';
		flush();
		assert.equal(div.className, 'undefined');

		component.testName = null + '';
		flush();
		assert.equal(div.className, 'null');

		component.testName = 1;
		flush();
		assert.equal(div.className, '1');

		component.testName = 0;
		flush();
		assert.equal(div.className, '0');

		component.testName = false;
		flush();
		assert.equal(div.className, 'false');

		component.testName = true;
		flush();
		assert.equal(div.className, 'true');

		component.testName = {};
		flush();
		assert.equal(div.className, '[object Object]');

		component.testName = '';
		flush();
		assert.equal(div.className, '');
	}
};
