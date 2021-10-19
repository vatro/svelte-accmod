<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})

	export function set_foo_of_child0_children_0(value) {
		// child0.children[0] is 'subchild0'-component reference
		child0.children[0].foo = value;
	}
	
</script>

main-updated:{updated}
<Child0 bind:this={child0}/>
