<script>
	import { afterUpdate, onMount } from 'svelte'
	import Child0 from './Child0.svelte'

	export let children = []
	export let bar = 1
	let child0
	let updated = 0
	let rs_c = 0
	let rs_c0 = 0

	$: children ? rs_c++ : null 
	$: children[0] ? rs_c0++ : null 

	onMount(()=>{
		children.push(child0)
	})

	afterUpdate(()=>{
		updated ++;
	})

	export function set_foo_of_children_0(value) {
		children[0].foo = value;
	}

	export function set_children_0(value) {
		children[0] = value;
	}

	export function set_bar_of_children_0(value) {
		// assumes children[0] was set to a main-component reference
		children[0].bar = value;
	}

	export function set_children_0_to_child0() {
		children[0] = child0
	}

	export function set_bar(value) {
		bar = value
	}

	export function set_bar_foo(value) {
		// assumes children[0] was set to a 'child0'-component-reference
		bar['foo'] = value
	}
	
</script>

main-updated:{updated}
rs-main.children:{rs_c}
rs-main.children[0]:{rs_c0}
<Child0 bind:this={child0}/>
