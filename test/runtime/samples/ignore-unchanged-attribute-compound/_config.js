import counter from './counter.js';

export default {
	props: {
		x: 1,
		y: 2
	},

	html: `
		<p>1</p>
		<p class='-2-'></p>
	`,

	test({ assert, component, flush, compileOptions }) {
		counter.count = 0;

		component.x = 3;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(counter.count, 0);

		component.x = 4;
		compileOptions.accessorsAsync ? flush() : null;
		component.y = 5;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(counter.count, 1);

		component.x = 5;
		compileOptions.accessorsAsync ? flush() : null;
		component.y = 5;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(counter.count, 1);
	}
};
