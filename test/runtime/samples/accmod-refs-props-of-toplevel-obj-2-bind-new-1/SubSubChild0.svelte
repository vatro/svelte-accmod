<script>
	import { afterUpdate } from "svelte";
	export let foo = 1;

	let updated = 0;
	let rs = 0;

	$: foo ? rs++ : null;

	afterUpdate(() => {
		updated++;
	});
</script>

subsubchild0.foo:{foo}
subsubchild0-updated:{updated}
rs-subsubchild0.foo:{rs}
