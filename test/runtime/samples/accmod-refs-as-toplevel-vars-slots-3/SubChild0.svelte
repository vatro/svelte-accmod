<script>
	import { afterUpdate } from 'svelte';

	let updated = 0;

	afterUpdate(() => {
		updated++;
	});
</script>

subchild0 updated: {updated}
<slot />
