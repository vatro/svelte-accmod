<script>
	import { afterUpdate, onMount } from 'svelte'
	import SubSubChild0 from './SubSubChild0.svelte'

	export let children = {
		all:[]
	}
	let subsubchild0
	let updated = 0
	let rs_c = 0
	let rs_c_all = 0
	let rs_c_all_0 = 0

	$: children ? rs_c++ : null 
	$: children.all ? rs_c_all++ : null 
	$: children.all[0] ? rs_c_all_0++ : null 

	onMount(()=>{
		children.all.push(subsubchild0)
	})

	afterUpdate(()=>{
		updated ++;
	})
	
</script>

subchild0-updated:{updated}
rs-subchild0.children:{rs_c}
rs-subchild0.children.all:{rs_c_all}
rs-subchild0.children.all_0:{rs_c_all_0}
<SubSubChild0 bind:this={subsubchild0}/>
