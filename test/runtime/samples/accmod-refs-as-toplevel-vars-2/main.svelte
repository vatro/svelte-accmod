<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	export let child0;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	export function set_foo_of_child2_via_ref_in_child1_as_ref_in_child0(value) {
		child0.child1.child2.foo = value;
	}

	export function reset_foo_of_child2_via_ref_in_child1_as_ref_in_child0() {
		child0.child1.child2.resetFoo()
	}
</script>

main updated: {updated}
<Child0 bind:this={child0} />
