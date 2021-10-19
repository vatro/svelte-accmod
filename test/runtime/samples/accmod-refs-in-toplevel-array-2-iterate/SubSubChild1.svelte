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

subsubchild1.foo:{foo}
subsubchild1-updated:{updated}
rs-subsubchild1.foo:{rs}