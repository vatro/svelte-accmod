<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	let child0;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	export function set_foo_of_child0_subchild0_children_all_0(value) {
		// child0.subchild0.children.all[0] is 'SubSubChild0'-component reference
		child0.subchild0.children.all[0].foo = value;
	}
</script>

main updated: {updated}
<Child0 bind:this={child0} />
