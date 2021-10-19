<script>
	import { afterUpdate, onMount } from "svelte";
	import Child from "./Child.svelte";
	import ChildSlot from "./ChildSlot.svelte";

	let child;
	let updates = 0;

	let slot_refs = {};

	let props_obj = {};
	let rs_props_obj = 0;

	$: props_obj ? rs_props_obj++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		const local_slot_refs_reref = slot_refs;

		for (let slot_key in local_slot_refs_reref) {
			let s = local_slot_refs_reref[slot_key]
			s.props_obj.foo = s.ind + 1;
		}

		for (let slot_key in local_slot_refs_reref) {
			let s = local_slot_refs_reref[slot_key]
			s.props_obj.foo += 3;
		}
	});
	
	export function change_all_slots_foo(val0, val1, val2) {
		const local_slot_refs_reref = slot_refs;
		for (let slot_key in local_slot_refs_reref) {
			const s = local_slot_refs_reref[slot_key]
			s.props_obj.foo = arguments[s.ind];
		}
	}

	export function change_childslot_0_foo(value) {
		const local_slot_refs_reref = slot_refs;
		const s = local_slot_refs_reref.cs0;
		s.props_obj.foo = value;
	}

	export function change_childslot_1_foo(value) {
		const local_slot_refs_reref = slot_refs;
		const s = local_slot_refs_reref.cs1;
		s.props_obj.foo = value;
	}

	export function change_childslot_2_foo(value) {
		const local_slot_refs_reref = slot_refs;
		const s = local_slot_refs_reref.cs2;
		s.props_obj.foo = value;
	}

	export function change_main_foo(value) {
		props_obj.foo = value;
	}

	export function change_child_foo(value) {
		child.props_obj.foo = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}, props_obj.foo: {props_obj.foo}, rs_props_obj: {rs_props_obj}

<Child bind:this={child}>
	<ChildSlot ind={0} bind:this={slot_refs["cs0"]} />
	<ChildSlot ind={1} bind:this={slot_refs["cs1"]} />
	<ChildSlot ind={2} bind:this={slot_refs["cs2"]} />
</Child>
