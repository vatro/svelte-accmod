<script>
	import { afterUpdate } from 'svelte';
	import Child from './Child.svelte';
	import Parent from './Parent.svelte';

	export let child;
	let updates = 0;

	afterUpdate(() => {
		updates++;
	});

	// see https://svelte.dev/tutorial/updating-arrays-and-objects
	// IMPORTANT : Just like in 'unmodified' Svelte using array methods like push and splice
	// won't be reactive, but we're able to reactively manipulate arrays using simpler
	// syntax not having to copy / clone / spread existing arrays.

	export function add_item_to_child_foo_at_specific_index(i, value) {
		// reactive -> will trigger foo-reactive-statements and a child update!
		child.foo[i] = value;
	}

	export function change_item_in_child_foo_at_specific_index(i, value) {
		// reactive -> will trigger foo-reactive-statements and a child update!
		child.foo[i] = value;
	}

	export function add_key_value_pair_to_obj_in_child_foo(i, key, value) {
		// reactive -> will trigger foo-reactive-statements and a child update!
		child.foo[i][key] = value;
	}

	export function add_item_to_child_foo_at_end(value) {
		// reactive -> will trigger foo-reactive-statements and a child update!
		child.foo[child.foo.length] = value;
	}

	export function recreate_child_foo_clone_spread_new_array(new_array) {
		// reactive -> will trigger foo-reactive-statements and a child update!
		child.foo = [...new_array];
	}
</script>

main updates: {updates}
<Parent depth={0}>
	<Parent depth={1}>
		<Parent depth={2}>
			<Parent depth={3}>
				<Parent depth={4}>
					<Child bind:this={child} />
				</Parent>
			</Parent>
		</Parent>
	</Parent>
</Parent>
