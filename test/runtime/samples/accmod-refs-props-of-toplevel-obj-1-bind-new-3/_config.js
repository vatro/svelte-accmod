export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on init / on mount
		// rs-child0.children get's triggered twice on init / on mount:
		// 	1. children is truthy at init
		// 	2. we change the children object by adding a prop 'subchild0' on mount
		// rs-main.children.subchild0 get's triggered once on mount:
		// 	- children.subchild0 is truthy after prop 'subchild0' has been added on mount
		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			rs-child0.children:2
			rs-child0.children.subchild0:1
			subchild0.foo:1
			subchild0-updated:1
			rs-subchild0.foo:1
		`);


		// using a component reference saved inside an object to access 'SubChild0' / change 'subchild0.foo'
		// - update ONLY the referenced 'SubChild0'-component (main.child0.children.subchild0) -> do NOT update 'main' or 'child0' components! (this is different in unmodified Svelte)
		// - don't trigger object's reactive statements -> we haven't changed the main.child0.children object! (this is different in unmodified Svelte)
		component.set_foo_of_child0_children_subchild0(2);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			rs-child0.children:2
			rs-child0.children.subchild0:1
			subchild0.foo:2
			subchild0-updated:2
			rs-subchild0.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_child0_children_subchild0(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			rs-child0.children:2
			rs-child0.children.subchild0:1
			subchild0.foo:3
			subchild0-updated:3
			rs-subchild0.foo:3
		`);
	}
};
