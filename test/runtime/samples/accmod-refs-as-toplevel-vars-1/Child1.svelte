<script>
	import { afterUpdate } from 'svelte'
	export let foo =  1;

	let updated = 0
	let rs = 0

	$: foo ? rs++ : null

	afterUpdate(()=>{
		updated ++;
	})
</script>

<p> child1.foo:     {foo} </p>
<p> child1 updated: {updated} </p>
<p> child1.foo rs:  {rs} </p>