<script>
	import { afterUpdate } from 'svelte';
	import Child2 from './Child2.svelte';

	export let child2;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});
</script>

child1 updated: {updated}
<Child2 bind:this={child2} />
