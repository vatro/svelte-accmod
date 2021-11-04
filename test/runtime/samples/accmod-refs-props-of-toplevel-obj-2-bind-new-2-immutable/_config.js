export default {
	immutable: true,
	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on init / on mount
		// rs-subchild0.children get's triggered twice on init / on mount:
		// 	1. children is truthy at init
		// 	2. we change the children object by adding a prop 'subsubchild0' on mount
		// rs-subchild0.children.subsubchild0 get's triggered once on mount:
		// 	- children.subsubchild0 is truthy after prop 'subsubchild0' has been added on mount

		// IMPORTANT  REMARK (immutable version):
		// 'subchild0.children' doesn't trigger related reactive statements, but component update behavior is OK / as intended!

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:1
			subsubchild0-updated:1
			rs-subsubchild0.foo:1
		`);


		// using a component reference saved inside an object to access 'SubSubChild0' / change 'subsubchild0.foo'
		// - update ONLY the referenced 'SubSubChild0'-component (main.child0.subchild0.children.subsubchild0) -> do NOT update 'main', 'child0' or 'subchild0' components! (this is different in unmodified Svelte)
		// - don't trigger object's reactive statements -> we haven't changed the main.child0.subchild0.children object! (this is different in unmodified Svelte)
		component.set_foo_of_child0_subchild0_children_subsubchild0(2);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:2
			subsubchild0-updated:2
			rs-subsubchild0.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_child0_subchild0_children_subsubchild0(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			child0-updated:1
			subchild0-updated:1
			rs-subchild0.children:1
			rs-subchild0.children.subsubchild0:0
			subsubchild0.foo:3
			subsubchild0-updated:3
			rs-subsubchild0.foo:3
		`);
	}
};
