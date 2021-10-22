export default {
	test({ assert, component, flush }) {
		let count = 0;

		component.$on('state', ({ changed }) => {
			if (changed.bar) count += 1;
		});

		component.x = true;
		flush();
		assert.equal(count, 0);
	}
};
