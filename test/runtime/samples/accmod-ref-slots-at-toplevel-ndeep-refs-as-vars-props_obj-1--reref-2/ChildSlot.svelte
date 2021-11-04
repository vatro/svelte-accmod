<script>
	import { afterUpdate } from 'svelte';

	export let depth;
	export let foo = 0;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	export let props_obj = undefined;

	let rs_props_obj = 0;

	$: props_obj ? rs_props_obj++ : null;

	let updates = 0;

	afterUpdate(() => {
		updates++;
	});
</script>

childslot {depth} updates: {updates}, foo: {foo}, rs_foo: {rs_foo}{#if props_obj}, props_obj x:{props_obj.x}
	y:{props_obj.y} z:{props_obj.z}, rs_props_obj: {rs_props_obj}{/if}
<slot />
