<script>
	import { afterUpdate } from 'svelte'

	let updated = 0

	afterUpdate(()=>{
		updated ++
	})
	
</script>

subchild0_updated:{updated}
<slot/>