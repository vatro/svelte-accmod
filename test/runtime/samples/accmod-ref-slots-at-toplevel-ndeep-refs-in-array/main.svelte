<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let slot_refs = [];

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		slot_refs[3].foo = 1;
		slot_refs[3].foo = 2;
		slot_refs[3].foo = 3;
	});

	export function set_foo_in_max_depth_childslot(value) {
		slot_refs[3].foo = value;
	}

	export function set_foo_in_childslot_depth_0(value) {
		slot_refs[0].foo = value;
	}

	export function set_foo_in_childslot_depth_1(value) {
		slot_refs[1].foo = value;
	}

	export function set_foo_in_childslot_depth_2(value) {
		slot_refs[2].foo = value;
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

<Child bind:this={child}>
	<ChildSlot depth={0} bind:this={slot_refs[0]}>
		<ChildSlot depth={1} bind:this={slot_refs[1]}>
			<ChildSlot depth={2} bind:this={slot_refs[2]}>
				<ChildSlot depth={3} bind:this={slot_refs[3]} />
			</ChildSlot>
		</ChildSlot>
	</ChildSlot>
</Child>
