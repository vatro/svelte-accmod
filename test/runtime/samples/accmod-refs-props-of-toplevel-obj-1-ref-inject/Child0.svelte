<script>
	import { afterUpdate, onMount } from 'svelte';
	import SubChild0 from './SubChild0.svelte';

	export let children = {};
	export let subchild0;

	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	// get's triggered twice on init / on mount:
	// 	1. children is truthy at init
	// 	2. we change the children object by creating a new prop on bind:this={subchild0}
	$: children ? rs_c++ : null;
	// get's triggered once on mount:
	// 	- children.subchild0 is truthy after prop 'child0' has been created on bind:this={subchild0}
	$: children.subchild0 ? rs_c_0++ : null;

	onMount(() => {
		children.subchild0 = subchild0;
	});

	afterUpdate(() => {
		updated++;
	});
</script>

child0-updated:{updated}
rs-child0.children:{rs_c}
rs-child0.children.subchild0:{rs_c_0}
<SubChild0 bind:this={subchild0} />
