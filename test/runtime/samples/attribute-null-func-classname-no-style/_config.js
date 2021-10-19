export default {
	props: {
		testName: 'testClassName'
	},

	html: '<div class="testClassName"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'testClassName');

		component.testName = null;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '');

		component.testName = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '');

		component.testName = undefined + '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'undefined');

		component.testName = null + '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'null');

		component.testName = 1;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '1');

		component.testName = 0;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '0');

		component.testName = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'false');

		component.testName = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, 'true');

		component.testName = {};
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '[object Object]');

		component.testName = '';
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(div.className, '');
	}
};
