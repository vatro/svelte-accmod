<script>
	import { afterUpdate } from 'svelte'
	export let foo =  0

	let updated = 0
	let rs = 0

	$: foo ? rs++ : null

	afterUpdate(()=>{
		updated ++
	})
	
</script>

subsubchild0_updated:{updated}
subsubchild0.foo:{foo}
rs_subsubchild0.foo:{rs}