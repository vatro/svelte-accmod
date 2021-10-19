<script>
	import { afterUpdate } from 'svelte'
	export let foo =  1

	let updated = 0
	let rs = 0

	$: foo ? rs++ : null

	afterUpdate(()=>{
		updated ++
	})

	export function resetFoo() {
		// setting foo to a falsy value: updates, but doesn't trigger reactive statement!
		// foo = 0 

		// updates and triggers reactive statement!
		foo = 1
	}
	
</script>

child0.foo:{foo}
child0-updated:{updated}
rs-child0.foo:{rs}