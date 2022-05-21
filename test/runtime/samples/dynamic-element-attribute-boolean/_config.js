export default {
	props: {
		disabled: false
	},
	html: '<button>Click me</button>',

	test({ assert, component, target, flush, compileOptions }) {
		const button = target.querySelector('button');
		assert.equal(button.disabled, false);

		component.disabled = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<button disabled>Click me</button>');
		assert.equal(button.disabled, true);
	}
};
