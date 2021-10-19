<script>
	import { afterUpdate, onMount } from 'svelte'
	import SubSubChild0 from './SubSubChild0.svelte'

	export let children = []
	let subsubchild0
	let updated = 0
	let rs_c = 0
	let rs_c_0 = 0

	$: children ? rs_c++ : null 
	$: children[0] ? rs_c_0++ : null 

	onMount(()=>{
		children.push(subsubchild0)
	})

	afterUpdate(()=>{
		updated ++;
	})
	
</script>

subchild0-updated:{updated}
rs-subchild0.children:{rs_c}
rs-subchild0.children[0]:{rs_c_0}
<SubSubChild0 bind:this={subsubchild0}/>
