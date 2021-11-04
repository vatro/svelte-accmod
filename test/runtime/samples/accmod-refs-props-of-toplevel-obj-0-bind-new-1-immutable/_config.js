export default {
	immutable: true,
	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on init / on mount
		// rs-main.children get's triggered twice on init / on mount:
		// 	1. children is truthy at init
		// 	2. we change the children object by adding a prop 'child0' on mount
		// rs-main.children.child0 get's triggered once on mount:
		// 	- children.child0 is truthy after prop 'child0' has been added on mount
		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children.child0:0
			child0.foo:1
			child0-updated:1
			rs-child0.foo:1
		`);


		// using a component reference saved inside an object to access 'Child0' / change 'child0.foo'
		// - update ONLY the referenced 'Child0'-component (main.children.child0) -> do NOT update 'main'-component! (this is different in unmodified Svelte)
		// - don't trigger object's reactive statements -> we haven't changed the main.children object! (this is different in unmodified Svelte)

		// IMPORTANT  REMARK (immutable version):
		// 'main.children' doesn't trigger related reactive statements, but component update behavior is OK / as intended!
		
		component.set_foo_of_children_child0(2);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children.child0:0
			child0.foo:2
			child0-updated:2
			rs-child0.foo:2
		`);

		// ... again.
		// again check: ok
		component.set_foo_of_children_child0(3);
		flush();

		assert.htmlEqual(target.innerHTML, `
			main-updated:1
			rs-main.children:1
			rs-main.children.child0:0
			child0.foo:3
			child0-updated:3
			rs-child0.foo:3
		`);
	}
};
