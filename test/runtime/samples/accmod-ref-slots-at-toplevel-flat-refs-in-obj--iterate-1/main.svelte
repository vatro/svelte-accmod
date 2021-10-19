<script>
	import { afterUpdate, onMount } from "svelte";
	import Child from "./Child.svelte";
	import ChildSlot from "./ChildSlot.svelte";

	let child;
	let updates = 0;

	let slot_refs = {}

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		for(let slot_key in slot_refs) {
			slot_refs[slot_key].foo = slot_refs[slot_key].ind + 1
		}

		for(let slot_key in slot_refs) {
			slot_refs[slot_key].foo += 3
		}
	});

	export function change_all_slots_foo(val0, val1, val2) {
		for(let slot_key in slot_refs) {
			slot_refs[slot_key].foo = arguments[slot_refs[slot_key].ind]
		}
	}

	export function change_childslot_0_foo(value) {
		slot_refs.cs0.foo = value;
	}

	export function change_childslot_1_foo(value) {
		slot_refs.cs1.foo = value;
	}

	export function change_childslot_2_foo(value) {
		slot_refs.cs2.foo = value;
	}

	export function change_main_foo(value) {
		foo = value;
	}

	export function change_child_foo(value) {
		child.foo = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}, foo: {foo}, rs_foo: {rs_foo}

<Child bind:this={child}>
	<ChildSlot ind={0} bind:this={slot_refs['cs0']} />
	<ChildSlot ind={1} bind:this={slot_refs['cs1']} />
	<ChildSlot ind={2} bind:this={slot_refs['cs2']} />
</Child>
