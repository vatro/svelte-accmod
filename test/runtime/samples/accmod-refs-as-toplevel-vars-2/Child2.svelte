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

child2.foo: {foo}
child2 updated: {updated}
child2.foo rs: {rs}
