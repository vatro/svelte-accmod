<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	export let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})

	function get_subchild_member_name(i) {
		return `subchild${i}`
	}

	/*
	function get_children_member_name() {
		return 'children'
	}

	function get_subsubchild0_member_name(i) {
		return `subsubchild${i}`
	}

	function get_foo_name() {
		return 'foo'
	}
	*/

	export function set_foo_of_subsubchild0_a(value) {
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}

	// same as _a
	export function set_foo_of_subsubchild0_b(value) {
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}

	// same as _a
	export function set_foo_of_subsubchild0_c(value) {
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}
	
</script>

main-updated:{updated}
<Child0 bind:this={child0}/>
