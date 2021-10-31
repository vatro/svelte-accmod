<script>
	import { afterUpdate } from 'svelte';
	export let foo = 1;

	let updated = 0;
	let rs = 0;

	$: foo ? rs++ : null;

	afterUpdate(() => {
		updated++;
	});

	export function resetFoo() {
		foo = 1;
	}
</script>

child1.foo: {foo}
child1 updated: {updated}
child1.foo rs: {rs}
