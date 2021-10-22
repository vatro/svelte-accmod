export default {
	props: {
		x: 11
	},

	html: `
		before-if-after
	`,

	test({ assert, component, target, flush }) {
		component.x = 4;
		flush();
		assert.htmlEqual(target.innerHTML, `
			before-elseif-after
		`);

		component.x = 6;
		flush();
		assert.htmlEqual(target.innerHTML, `
			before-else-after
		`);
	}
};
