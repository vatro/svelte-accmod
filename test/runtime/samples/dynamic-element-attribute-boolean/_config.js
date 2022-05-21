export default {
	props: {
		disabled: false
	},
	html: '<button>Click me</button>',

	test({ assert, component, target, flush }) {
		const button = target.querySelector('button');
		assert.equal(button.disabled, false);

		component.disabled = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<button disabled>Click me</button>');
		assert.equal(button.disabled, true);
	}
};
