<script>
	import { afterUpdate, onMount } from "svelte";
	import Child from "./Child.svelte";
	import ChildSlot from "./ChildSlot.svelte";
	import ChildSlotLoose from "./ChildSlotLoose.svelte";

	let child;
	let looseSlot;

	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	let updates = 0;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		set_slots_foo_values(1);
		set_slots_foo_values(2);
	});

	export function set_slots_foo_values(incr) {
		for (let i = 0; i < child.slots_refs.length; i++) {
			child.slots_refs[i].foo = i + incr;
		}
	}

	export function set_loose_slot_foo_value(value) {
		looseSlot.foo = value;
	}

	export function set_main_foo(value) {
		foo = value;
	}

	export function set_child_foo(value) {
		child.foo = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}, foo: {foo}, rs_foo: {rs_foo}

<Child bind:this={child} let:slots_refs>
	<ChildSlot {slots_refs} />
	<ChildSlot {slots_refs} />
	<ChildSlot {slots_refs} />
	<ChildSlotLoose bind:this={looseSlot} />
</Child>
