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

subsubchild2.foo:{foo}
subsubchild2-updated:{updated}
rs-subsubchild2.foo:{rs}
