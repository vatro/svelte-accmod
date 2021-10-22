export default {
	props: {
		user: { active: true }
	},

	html: '<div class="active"></div>',

	test({ assert, component, target, flush }) {
		component.user = { active: false };
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div class></div>
		`);
	}
};
