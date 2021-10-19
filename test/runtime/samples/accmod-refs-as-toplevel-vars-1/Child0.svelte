<script>
	import { afterUpdate } from 'svelte'
	import Child1 from './Child1.svelte'

	export let child1
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})
</script>

<p> child0 updated: {updated} </p>
<Child1 bind:this={child1}/>