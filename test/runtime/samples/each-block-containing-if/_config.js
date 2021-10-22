export default {
	test({ assert, component, target, flush }) {
		const items = component.items;
		flush();
		items.forEach(item => item.completed = false);

		component.currentFilter = 'all';
		flush();

		assert.htmlEqual(target.innerHTML, `
			<ul><li>one</li><li>two</li><li>three</li></ul>
		`);
	}
};
