<script>
	import { afterUpdate } from 'svelte';
	import Child from './Child.svelte';

	export let child;
	let updates = 0;

	afterUpdate(() => {
		updates++;
	});

	// see https://svelte.dev/tutorial/updating-arrays-and-objects
	// in 'svelte-accmod' using array methods like push and splice won't automatically cause updates
	// just like in unmodified Svelte, but we're able to manipulate arrays using simpler syntax
	// not having to copy / clone / spread existing arrays.

	export function add_item_to_child_foo_at_specific_index(i, value) {
		// (!!!) this isn't reactive / doesn't work, just like in unmodified Svelte
		//child.foo.push(value);

		// assigning a value to specific element / index of an array
		// reactive -> this will trigger foo-reactive-statements and a child update!
		child.foo[i] = value;
	}

	export function change_item_in_child_foo_at_specific_index(i, value) {
		// (!!!) this isn't reactive / doesn't work, just like in unmodified Svelte
		//child.foo.push(value);

		// assigning a value to specific element / index of an array
		// reactive -> this will trigger foo-reactive-statements and a child update!
		child.foo[i] = value;
	}

	export function add_key_value_pair_to_obj_in_child_foo(i, key, value) {
		child.foo[i][key] = value;
	}

	export function add_item_to_child_foo_at_end(value) {
		// (!!!) this isn't reactive / doesn't work, just like in unmodified Svelte
		//child.foo.push(value);

		// assigning a value to the last element of array
		// reactive -> this will trigger foo-reactive-statements and a child update!
		child.foo[child.foo.length] = value;
	}

	export function recreate_child_foo_clone_spread_new_array(new_array) {
		// (!!!) this isn't reactive / doesn't work, just like in unmodified Svelte
		//child.foo.push(value);

		// assigning a value to the last element of array
		// reactive -> this will trigger foo-reactive-statements and a child update!
		child.foo = [...new_array];
	}
</script>

main updates: {updates}
<Child bind:this={child} />
