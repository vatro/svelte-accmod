export default {
	test({ assert, component, target, flush, compileOptions }) {
		const items = component.items;
		compileOptions.accessorsAsync ? flush() : null;
		items.forEach(item => item.completed = false);

		component.currentFilter = 'all';
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<ul><li>one</li><li>two</li><li>three</li></ul>
		`);
	}
};
