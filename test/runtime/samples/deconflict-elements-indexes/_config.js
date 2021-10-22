export default {
	html: `
		<div>
			<i>one</i>
		</div>
	`,

	preserveIdentifiers: true,

	test({ assert, component, target, flush }) {
		const { tagList } = component;
		tagList.push('two');
		component.tagList = tagList;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>
				<i>one</i>
				<i>two</i>
			</div>
		`);
	}
};
