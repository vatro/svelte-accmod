<script>
	import { afterUpdate } from "svelte";

	export let ind = undefined;
	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	let updates = 0;

	afterUpdate(() => {
		updates++;
	});
</script>

childslot {ind} updates: {updates}, foo: {foo}, rs_foo: {rs_foo}
