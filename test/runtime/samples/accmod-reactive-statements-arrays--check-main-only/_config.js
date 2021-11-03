import { tick } from 'svelte';

export default {
	skip: true,

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);


		// IMPORTANT  'accmod' Remark:
		// Reactive statements bound to computed array item refrences, e.g. `arr[0] = 'a'; $: arr[0] ? ...`
		// will be triggered when 'arr' is being changed (by e.g. adding an item or changing any of the items). If the operation
		// sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		// TODO  if we set 'useAccMod' and 'accessorsAsync' to 'false' and test, we don't get the (unwanted) additional 'main' update,
		// this is different than in REPL, WHY?
		component.add_item_to_child_foo_at_specific_index(0, 'a');
		await tick();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

	
		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		component.add_item_to_child_foo_at_specific_index(3, 'b');
		await tick();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

	
		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		component.add_item_to_child_foo_at_specific_index(1, {});
		await tick();

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		/*
		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		component.add_item_to_child_foo_at_specific_index(2, 20);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		component.add_item_to_child_foo_at_end([1, 2, 3]);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		// SVELTE 'unmodified': bad -> would trigger main-update +1 (wrong / unwanted) only, nothing else!
		component.change_item_in_child_foo_at_specific_index(0, 'ax');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		// No value change check
		// IMPORTANT  'accmod' remark:
		// If the operation sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		component.change_item_in_child_foo_at_specific_index(0, 'ax');
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		// SVELTE 'unmodified': bad -> would trigger nothing (double wrong / double unwanted)!
		component.add_key_value_pair_to_obj_in_child_foo(1, 'bar', 1000);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);

		// IMPORTANT  'accmod' remark:
		// If the operation sets but doesn't change the value of an item, 'arr'-related reactive statements will NOT be triggered,
		// also NO component update will be triggered, which is correct / wanted behavior!

		component.add_key_value_pair_to_obj_in_child_foo(1, 'bar', 1000);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);


		component.recreate_child_foo_clone_spread_new_array(['a', 'b', 'c', 'd', 'e']);
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			main updates: 1
		`);
		*/
	}

};
