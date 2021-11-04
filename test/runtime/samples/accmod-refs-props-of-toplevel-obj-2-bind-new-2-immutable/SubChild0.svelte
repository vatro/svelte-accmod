<script>
	import { afterUpdate } from 'svelte';
	import SubSubChild0 from './SubSubChild0.svelte';

	export let children = {};

	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	// get's triggered twice on init / on mount:
	// 	1. children is truthy at init
	// 	2. we change the children object by creating a new prop on bind:this={children.subsubchild0}
	$: children ? rs_c++ : null;
	// get's triggered once on mount:
	// 	- children.subsubchild0 is truthy after prop 'subsubchild0' has been created on bind:this={children.subsubchild0}
	$: children.subsubchild0 ? rs_c_0++ : null;

	afterUpdate(() => {
		updated++;
	});
</script>

subchild0-updated:{updated}
rs-subchild0.children:{rs_c}
rs-subchild0.children.subsubchild0:{rs_c_0}
<SubSubChild0 bind:this={children.subsubchild0} />
