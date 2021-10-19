export default {
	props: {
		user: { active: true }
	},

	html: '<div class="active"></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.user = { active: false };
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div class></div>
		`);
	}
};
