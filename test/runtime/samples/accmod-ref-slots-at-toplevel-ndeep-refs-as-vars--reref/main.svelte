<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let childslot_max_depth;
	let childslot_depth_0;
	let childslot_depth_1;
	let childslot_depth_2;

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		const csmd = childslot_max_depth;
		csmd.foo = 1;
		csmd.foo = 2;
		csmd.foo = 3;
	});

	// via "FIX" -> same behavior? : YES!
	export function set_foo_in_max_depth_childslot(value) {
		const csmd = childslot_max_depth;
		csmd.foo = value;
	}

	// via "FIX" -> same behavior? : YES!
	export function set_foo_in_childslot_depth_0(value) {
		const cs0 = childslot_depth_0;
		cs0.foo = value;
	}

	// via "FIX" -> same behavior? : YES!
	export function set_foo_in_childslot_depth_1(value) {
		const cs1 = childslot_depth_1;
		cs1.foo = value;
	}

	// via "FIX" -> same behavior? : YES!
	export function set_foo_in_childslot_depth_2(value) {
		const cs2 = childslot_depth_2;
		cs2.foo = value;
	}

	export function set_main_foo(value) {
		foo = value;
	}

	// via "FIX" -> same behavior? : YES!
	export function set_child_foo(value) {
		const c = child;
		c.foo = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}, foo: {foo}, rs_foo: {rs_foo}

<Child bind:this={child}>
	<ChildSlot depth={0} bind:this={childslot_depth_0}>
		<ChildSlot depth={1} bind:this={childslot_depth_1}>
			<ChildSlot depth={2} bind:this={childslot_depth_2}>
				<ChildSlot depth={3} bind:this={childslot_max_depth} />
			</ChildSlot>
		</ChildSlot>
	</ChildSlot>
</Child>
