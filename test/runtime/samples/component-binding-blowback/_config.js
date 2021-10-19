export default {
	test({ assert, component, flush, compileOptions }) {
		let count = 0;

		component.$on('state', ({ changed }) => {
			if (changed.bar) count += 1;
		});

		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(count, 0);
	}
};
