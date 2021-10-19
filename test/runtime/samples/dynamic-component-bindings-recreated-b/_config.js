export default {
	props: {
		x: true
	},

	html: `
		<p>parent green</p>
		<p>green green</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		component.x = false;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>parent red</p>
			<p>red red</p>
		`);

		component.foo = undefined;
		compileOptions.accessorsAsync ? flush() : null;
		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>parent green</p>
			<p>green green</p>
		`);
	}
};
