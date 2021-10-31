<script>
	import { afterUpdate } from 'svelte';

	export let ind = undefined;
	export let props_obj = {};

	let rs_props_obj = 0;

	$: props_obj ? rs_props_obj++ : null;

	let updates = 0;

	afterUpdate(() => {
		updates++;
	});
</script>

childslot {ind} updates: {updates}, props_obj.foo: {props_obj.foo}, rs_props_obj: {rs_props_obj}
