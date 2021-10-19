<script>
	import { afterUpdate, onMount } from "svelte";

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {});

	export function change_foo() {
		foo = get_foo_value()
	}

	function get_foo_value() {
		let start_value = 1;
		let incr = 10;

		const vals = {
			start_value,
			incr
		}

		const vals_reref1 = vals;
		const vals_reref2 = vals_reref1;
		const vals_reref3 = vals_reref2;

		vals_reref3.start_value = 2;
		vals_reref3.incr = 20;

		const val = vals_reref3.start_value + vals_reref3.incr

		return val
	}

	let updates = 0

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}, foo: {foo}, rs_foo: {rs_foo}