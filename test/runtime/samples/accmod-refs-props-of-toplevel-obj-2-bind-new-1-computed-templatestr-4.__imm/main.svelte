<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	export let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})

	function get_subchild_suffix(num) {
		return num - 1
	}

	function get_one_minus(num) {
		return num - 1
	}

	let two = 2

	export function set_foo_of_subsubchild0_a(value) {
		child0[`subchild${get_subchild_suffix(get_one_minus(Number(`${two}`)))}`].children.subsubchild0.foo = value;
	}

	export function set_foo_of_subsubchild0_via_FIX(value) {
		let comp = child0
		comp[`subchild${get_subchild_suffix(get_one_minus(Number(`${two}`)))}`].children.subsubchild0.foo = value;
	}
	
</script>

main-updated:{updated}
<Child0 bind:this={child0}/>
