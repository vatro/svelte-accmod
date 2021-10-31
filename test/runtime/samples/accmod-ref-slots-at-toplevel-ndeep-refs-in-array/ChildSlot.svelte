<script>
	import { afterUpdate } from 'svelte';

	export let depth = undefined;
	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	let updates = 0;

	afterUpdate(() => {
		updates++;
	});
</script>

childslot {depth} updates: {updates}, foo: {foo}, rs_foo: {rs_foo}
<slot />
