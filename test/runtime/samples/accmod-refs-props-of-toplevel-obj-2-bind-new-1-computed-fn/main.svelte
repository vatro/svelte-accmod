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

	export function set_foo_of_subsubchild0_a(value) {
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}

	export function set_foo_of_subsubchild0_via_FIX(value) {
		let comp = child0;
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}
</script>

main-updated:{updated}
<Child0 bind:this={child0} />
