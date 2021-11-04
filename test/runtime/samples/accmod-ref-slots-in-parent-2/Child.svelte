<script>
	import { afterUpdate } from 'svelte';

	export let foo = 0;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	export const slots_refs = [];

	let updates = 0;

	afterUpdate(() => {
		updates++;
	});
</script>

child updates: {updates}, foo: {foo}, rs_foo: {rs_foo}
<slot {slots_refs} />
