<script>
	import { afterUpdate, onMount } from 'svelte';
	import SubSubChild0 from './SubSubChild0.svelte';

	export let children = [undefined];
	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	// get's triggered twice on init / on mount:
	// 	1. children is truthy at init
	// 	2. we change the value of an existing element via bind:this={children[0]} -> children array changed
	$: children ? rs_c++ : null;
	// get's triggered once on mount:
	// 	- we change the value of an existing 'undefined' (children[0]) element via bind:this={children[0]}
	$: children[0] ? rs_c_0++ : null;

	afterUpdate(() => {
		updated++;
	});
</script>

subchild0-updated:{updated}
rs-subchild0.children:{rs_c}
rs-subchild0.children[0]:{rs_c_0}
<SubSubChild0 bind:this={children[0]} />
