<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	export let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})

	// all pass --------------------------------------------------------

	export function set_foo_of_subsubchild0_a(value) {
		child0.subchild0.children.subsubchild0.foo = value;
	}

	export function set_foo_of_subsubchild0_b(value) {
		child0['subchild0']['children']['subsubchild0']['foo'] = value;
	}

	export function set_foo_of_subsubchild0_c(value) {
		child0['subchild0']['children']['subsubchild0'].foo = value;
	}

	export function set_foo_of_subsubchild0_d(value) {
		child0['subchild0']['children'].subsubchild0.foo = value;
	}

	export function set_foo_of_subsubchild0_e(value) {
		child0['subchild0'].children.subsubchild0.foo = value;
	}

	// computed function (all pass) / / TODO  fix string literals! --------

	function get_subchild_member_name(i) {
		return `subchild${i}`
	}

	function get_children_member_name() {
		return 'children'
	}

	function get_subsubchild0_member_name(i) {
		return `subsubchild${i}`
	}

	function get_foo_name() {
		return 'foo'
	}

	export function set_foo_of_subsubchild0_f(value) {
		child0[get_subchild_member_name(0)][get_children_member_name()][get_subsubchild0_member_name(0)][get_foo_name()] = value;
	}

	export function set_foo_of_subsubchild0_g(value) {
		child0[get_subchild_member_name(0)][get_children_member_name()][get_subsubchild0_member_name(0)].foo = value;
	}

	export function set_foo_of_subsubchild0_h(value) {
		child0[get_subchild_member_name(0)][get_children_member_name()].subsubchild0.foo = value;
	}

	export function set_foo_of_subsubchild0_i(value) {
		child0[get_subchild_member_name(0)].children.subsubchild0.foo = value;
	}

	// ---

	export function set_foo_of_subsubchild0_j(value) {
		child0.subchild0[get_children_member_name()][get_subsubchild0_member_name(0)][get_foo_name()] = value;
	}

	export function set_foo_of_subsubchild0_k(value) {
		child0.subchild0.children[get_subsubchild0_member_name(0)][get_foo_name()] = value;
	}

	export function set_foo_of_subsubchild0_l(value) {
		child0.subchild0.children.subsubchild0[get_foo_name()] = value;
	}

	
</script>

main-updated:{updated}
<Child0 bind:this={child0}/>
