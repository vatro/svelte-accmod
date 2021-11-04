<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	export let children = {};
	export let bar = 1;

	let updated = 0;
	let rs_c = 0;
	let rs_c_0 = 0;

	// get's triggered twice on init / on mount:
	// 	1. children is truthy at init
	// 	2. we change the children object by creating a new prop on bind:this={children.child0}
	$: children ? rs_c++ : null;
	// get's triggered once on mount:
	// 	- children.child0 is truthy after prop 'child0' has been created on bind:this={children.child0}
	$: children.child0 ? rs_c_0++ : null;

	afterUpdate(() => {
		updated++;
	});

	function get_child_ref_name(i) {
		return `child${i}`;
	}

	export function set_foo_of_children_child0(value) {
		children.child0.foo = value;
	}
</script>

main-updated:{updated}
rs-main.children:{rs_c}
rs-main.children.child0:{rs_c_0}
<Child0 bind:this={children[get_child_ref_name(0)]} />
