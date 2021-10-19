export default {

	props: {
		foo: false
	},

	test({ assert, component, target, flush, compileOptions }) {
		const inputs = target.querySelectorAll('input');

		assert.ok(inputs[0].checked);
		assert.ok(!inputs[1].checked);

		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;

		assert.ok(!inputs[0].checked);
		assert.ok(inputs[1].checked);
	}
};
