<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let childslot_0;
	let childslot_1;
	let childslot_2;

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		childslot_0.foo = 1;
		childslot_1.foo = 2;
		childslot_2.foo = 3;

		childslot_0.foo = 4;
		childslot_1.foo = 5;
		childslot_2.foo = 6;
	});

	export function change_all_slots_foo(val0, val1, val2) {
		childslot_0.foo = val0;
		childslot_1.foo = val1;
		childslot_2.foo = val2;
	}

	export function change_childslot_0_foo(value) {
		childslot_0.foo = value;
	}

	export function change_childslot_1_foo(value) {
		childslot_1.foo = value;
	}

	export function change_childslot_2_foo(value) {
		childslot_2.foo = value;
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
	<ChildSlot ind={0} bind:this={childslot_0} />
	<ChildSlot ind={1} bind:this={childslot_1} />
	<ChildSlot ind={2} bind:this={childslot_2} />
</Child>
