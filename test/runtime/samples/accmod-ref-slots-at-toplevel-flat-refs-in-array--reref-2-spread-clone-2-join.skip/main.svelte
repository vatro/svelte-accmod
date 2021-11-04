<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let slot_refs1 = [];
	let slot_refs2 = [];

	let foo = 0;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		const local_slot_refs_arr = [...slot_refs1, ...slot_refs2];
		const sref0 = local_slot_refs_arr[0];
		const sref1 = local_slot_refs_arr[1];
		const sref2 = local_slot_refs_arr[2];

		sref0.foo = 1;
		sref1.foo = 2;
		sref2.foo = 3;

		sref0.foo = 4;
		sref1.foo = 5;
		sref2.foo = 6;
	});

	export function change_all_slots_foo(val0, val1, val2) {
		const local_slot_refs_arr = [...slot_refs1, ...slot_refs2];
		const sref0 = local_slot_refs_arr[0];
		const sref1 = local_slot_refs_arr[1];
		const sref2 = local_slot_refs_arr[2];

		sref0.foo = val0;
		sref1.foo = val1;
		sref2.foo = val2;
	}

	export function change_childslot_0_foo(value) {
		const local_slot_refs_arr = [...slot_refs1, ...slot_refs2];
		const sref0 = local_slot_refs_arr[0];
		sref0.foo = value;
	}

	export function change_childslot_1_foo(value) {
		const local_slot_refs_arr = [...slot_refs1, ...slot_refs2];
		const sref1 = local_slot_refs_arr[1];
		sref1.foo = value;
	}

	export function change_childslot_2_foo(value) {
		const local_slot_refs_arr = [...slot_refs1, ...slot_refs2];
		const sref2 = local_slot_refs_arr[2];
		sref2.foo = value;
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
	<ChildSlot ind={0} bind:this={slot_refs1[0]} />
	<ChildSlot ind={1} bind:this={slot_refs1[1]} />
	<ChildSlot ind={2} bind:this={slot_refs2[2]} />
</Child>
