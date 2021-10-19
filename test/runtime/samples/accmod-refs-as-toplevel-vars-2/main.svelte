<script>
	import { afterUpdate } from 'svelte'
	import Child0 from './Child0.svelte'

	export let child0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})
	
</script>

<p> main updated:   {updated} </p>
<Child0 bind:this={child0}/>
