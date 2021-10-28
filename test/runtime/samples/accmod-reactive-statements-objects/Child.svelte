<script>
	import { afterUpdate } from "svelte";

	export let foo = {}

	let rs_foo = 0

	let rs_foo_a = 0
	let rs_foo_b = 0
	let rs_foo_c = 0
	let rs_foo_d = 0
	let rs_foo_e = 0
	
	let updates = 0

	$: foo ? rs_foo ++ : null

	$: foo.a ? rs_foo_a ++ : null
	$: foo.b ? rs_foo_b ++ : null
	$: foo.c ? rs_foo_c ++ : null
	$: foo.d ? rs_foo_d ++ : null
	$: foo.e ? rs_foo_e ++ : null

	afterUpdate(()=> {
		updates++
	})

</script>

child updates: {updates}
rs_foo: {rs_foo}
rs_foo_a: {rs_foo_a}
rs_foo_b: {rs_foo_b}
rs_foo_c: {rs_foo_c}
rs_foo_d: {rs_foo_d}
rs_foo_e: {rs_foo_e}