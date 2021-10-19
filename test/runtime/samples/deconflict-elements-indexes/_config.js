export default {
	html: `
		<div>
			<i>one</i>
		</div>
	`,

	preserveIdentifiers: true,

	test({ assert, component, target, flush, compileOptions }) {
		const { tagList } = component;
		tagList.push('two');
		component.tagList = tagList;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<div>
				<i>one</i>
				<i>two</i>
			</div>
		`);
	}
};
