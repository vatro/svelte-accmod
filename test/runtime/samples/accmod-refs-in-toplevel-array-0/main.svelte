<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child0 from './Child0.svelte';

	export let children = [];
	export let bar = 1;
	
	let child0;
	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	$: children ? rs_c++ : null;
	$: children[0] ? rs_c_0++ : null;

	onMount(() => {
		// REACTIVE!
		children[0] = child0;
	});

	afterUpdate(() => {
		updated++;
	});

	export function set_foo_of_children_0(value) {
		children[0].foo = value;
	}
</script>

main updated: {updated}
rs main.children: {rs_c}
rs main.children[0]: {rs_c_0}
<Child0 bind:this={child0} />
