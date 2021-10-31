<script>
	import { afterUpdate } from 'svelte';
	import Child from './Child.svelte';

	export let child;
	let updates = 0;

	afterUpdate(() => {
		updates++;
	});

	export function set_new_key_in_child_foo_obj(key, key_value) {
		child.foo[key] = key_value;
	}

	export function change_key_in_child_foo_obj(key, key_value) {
		child.foo[key] = key_value;
	}

	export function set_new_key_in_child_foo_obj_benefit(key, key_value) {
		// REACTIVE!
		// this doesn't work that simple in 'unmodified' SVELTE , see https://svelte.dev/tutorial/updating-arrays-and-objects
		const foo = child.foo;
		foo[key] = key_value;
	}

	export function change_key_in_child_foo_obj_benefit(key, key_value) {
		// REACTIVE!
		// this doesn't work that simple in 'unmodified' SVELTE , see https://svelte.dev/tutorial/updating-arrays-and-objects
		const foo = child.foo;
		foo[key] = key_value;
	}
</script>

main updates: {updates}
<Child bind:this={child} />
