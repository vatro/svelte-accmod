<script>
	import { afterUpdate } from 'svelte';
	let updates = 0;
	export let depth;

	afterUpdate(() => {
		updates++;
	});
</script>

parent-{depth} updates: {updates}
<slot />
