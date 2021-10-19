<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	export let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})

	export function set_foo_of_child0_children_subchild0(value) {
		child0.children.subchild0.foo = value;
	}
	
</script>

main-updated:{updated}
<Child0 bind:this={child0}/>
