<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	let child0;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	export function set_foo_of_child0_subchild0_children_all(value) {
		// child0.subchild0.children[i] are all 'SubSubChildX'-component references
		for (let i = 0; i < child0.subchild0.children.length; i++) {
			child0.subchild0.children[i].foo = value;
		}
	}
</script>

main-updated:{updated}
<Child0 bind:this={child0} />
