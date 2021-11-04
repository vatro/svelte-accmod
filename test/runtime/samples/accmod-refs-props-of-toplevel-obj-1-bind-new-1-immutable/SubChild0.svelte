<script>
	import { afterUpdate } from 'svelte';
	export let foo = 1;

	let updated = 0;
	let rs = 0;

	$: foo ? rs++ : null;

	afterUpdate(() => {
		updated++;
	});
</script>

subchild0.foo:{foo}
subchild0-updated:{updated}
rs-subchild0.foo:{rs}
