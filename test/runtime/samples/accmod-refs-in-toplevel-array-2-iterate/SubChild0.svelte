<script>
	import { afterUpdate, onMount } from 'svelte'
	import SubSubChild0 from './SubSubChild0.svelte'
	import SubSubChild1 from './SubSubChild1.svelte'
	import SubSubChild2 from './SubSubChild2.svelte'

	export let children = []

	let subsubchild0
	let subsubchild1
	let subsubchild2

	let updated = 0
	let rs_c = 0
	let rs_c_0 = 0

	$: children ? rs_c++ : null 
	$: children[0] ? rs_c_0++ : null 

	onMount(()=>{
		children.push(subsubchild0, subsubchild1, subsubchild2)
	})

	afterUpdate(()=>{
		updated ++;
	})
	
</script>

subchild0-updated:{updated}
rs-subchild0.children:{rs_c}
rs-subchild0.children[0]:{rs_c_0}
<SubSubChild0 bind:this={subsubchild0}/>
<SubSubChild1 bind:this={subsubchild1}/>
<SubSubChild2 bind:this={subsubchild2}/>
