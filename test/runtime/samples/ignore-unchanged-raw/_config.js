import counter from './counter.js';

export default {
	props: {
		x: 1,
		y: 2
	},

	html: `
		<p>1</p>
		<p>2</p>
	`,

	test({ assert, component, flush }) {
		counter.count = 0;

		component.x = 3;
		flush();
		assert.equal(counter.count, 0);

		component.x = 4;
		flush();
		component.y = 5;
		flush();
		assert.equal(counter.count, 1);

		component.x = 5;
		flush();
		component.y = 5;
		flush();
		assert.equal(counter.count, 1);
	}
};
