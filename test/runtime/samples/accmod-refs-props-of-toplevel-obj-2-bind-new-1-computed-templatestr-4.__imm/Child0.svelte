<script>
	import { afterUpdate } from 'svelte'
	import SubChild0 from './SubChild0.svelte'

	export let subchild0
	let updated = 0

	afterUpdate(()=>{
		updated ++;
	})
	
</script>

child0-updated:{updated}
<SubChild0 bind:this={subchild0}/>
