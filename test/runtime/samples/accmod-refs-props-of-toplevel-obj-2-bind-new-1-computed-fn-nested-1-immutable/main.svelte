<script>
	import { afterUpdate } from 'svelte';
	import Child0 from './Child0.svelte';

	export let child0;
	let updated = 0;

	afterUpdate(() => {
		updated++;
	});

	function get_subchild_member_name(i) {
		return `subchild${i}`;
	}

	function get_subchild_suffix(num) {
		return num + 1;
	}

	export function set_foo_of_subsubchild0_a(value) {
		child0[get_subchild_member_name(get_subchild_suffix(-1))].children.subsubchild0.foo = value;
	}
</script>

main-updated:{updated}
<Child0 bind:this={child0} />
