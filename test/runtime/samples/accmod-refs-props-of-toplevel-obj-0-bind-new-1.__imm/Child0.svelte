<script>
	import { afterUpdate } from 'svelte'
	export let foo =  1

	let updated = 0
	let rs = 0

	$: foo ? rs++ : null

	afterUpdate(()=>{
		updated ++
	})
	
</script>

child0.foo:{foo}
child0-updated:{updated}
rs-child0.foo:{rs}