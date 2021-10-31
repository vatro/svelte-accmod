<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	export let child0;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	export function set_foo_of_child1_via_child1_ref_in_child0(value) {
		child0.child1.foo = value;
	}

	export function reset_foo_of_child1_via_child1_ref_in_child0() {
		child0.child1.resetFoo();
	}
</script>

main updated: {updated}
<Child0 bind:this={child0} />
