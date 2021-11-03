<script>
	import { afterUpdate, onMount } from 'svelte';
	import SubChild0 from './SubChild0.svelte';

	export let children = [];

	let subchild0;
	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	$: children ? rs_c++ : null;
	$: children[0] ? rs_c_0++ : null;

	onMount(() => {
		// reactive push
		children[0] = subchild0
	});

	afterUpdate(() => {
		updated++;
	});
</script>

child0 updated: {updated}
rs child0.children: {rs_c}
rs child0.children[0]: {rs_c_0}
<SubChild0 bind:this={subchild0} />
