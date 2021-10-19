export default {
	html: `
		<div>
			<p>unconditional</p>
		</div>`,

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<div>
				<p>unconditional</p>
				<p>conditional</p>
			</div>
		`);
	}
};
