<script>
	import { afterUpdate } from 'svelte'
	import Child2 from './Child2.svelte'

	export let child2
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})
</script>

<p> child1 updated: {updated} </p>
<Child2 bind:this={child2}/>