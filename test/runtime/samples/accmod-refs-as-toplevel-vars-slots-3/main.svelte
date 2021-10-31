<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';
	import SubChild0 from './SubChild0.svelte';
	import SubSubChild0 from './SubSubChild0.svelte';

	let subsubchild0;

	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	export function set_subsubchild0_foo(value) {
		subsubchild0.foo = value;
	}
</script>

main updated: {updated}
<Child0>
	<SubChild0>
		<SubSubChild0 bind:this={subsubchild0} />
	</SubChild0>
</Child0>
