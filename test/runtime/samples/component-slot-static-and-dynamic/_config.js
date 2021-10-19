export default {
	html: `
		<div>
			<span slot="a">static</span>
			<span slot="b">0</span>
		</div>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.dynamic += 1;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>
				<span slot="a">static</span>
				<span slot="b">1</span>
			</div>
		`);
	}
};
