<script>
	import { afterUpdate } from 'svelte'

	let updated = 0

	afterUpdate(()=>{
		updated ++
	})
	
</script>

child0_updated:{updated}
<slot/>