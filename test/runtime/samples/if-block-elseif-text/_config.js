export default {
	props: {
		x: 11
	},

	html: `
		before-if-after
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 4;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before-elseif-after
		`);

		component.x = 6;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			before-else-after
		`);
	}
};
