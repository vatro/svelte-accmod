<script>
	import { afterUpdate, onMount } from "svelte";
	import { get_current_component } from "svelte/internal";

	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	export let slots_refs = undefined;

	let self = get_current_component();

	let updates = 0;

	onMount(() => {
		slots_refs.push(self);
	});

	afterUpdate(() => {
		updates++;
	});
</script>

childslot updates: {updates}, foo: {foo}, rs_foo: {rs_foo}
