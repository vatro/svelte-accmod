<script>
	import { afterUpdate } from 'svelte';

	export let foo = [];

	let rs_foo = 0;
	let rs_foo_0 = 0;
	let rs_foo_1 = 0;
	let rs_foo_2 = 0;
	let rs_foo_3 = 0;
	let rs_foo_4 = 0;
	let updates = 0;

	$: foo ? rs_foo++ : null;

	$: foo[0] ? rs_foo_0++ : null;
	$: foo[1] ? rs_foo_1++ : null;
	$: foo[2] ? rs_foo_2++ : null;
	$: foo[3] ? rs_foo_3++ : null;
	$: foo[4] ? rs_foo_4++ : null;

	afterUpdate(() => {
		updates++;
	});
</script>