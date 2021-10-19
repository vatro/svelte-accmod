<script>
	import { afterUpdate, onMount } from "svelte";
	import Child from "./Child.svelte";
	import ChildSlot from "./ChildSlot.svelte";

	let child;
	let updates = 0;

	let childslot_0;
	let childslot_1;
	let childslot_2;

	let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		const c0 = childslot_0;
		const c1 = childslot_1;
		const c2 = childslot_2;

		c0.foo = 1;
		c1.foo = 2;
		c2.foo = 3;

		c0.foo = 4;
		c1.foo = 5;
		c2.foo = 6;
	});

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	export function change_all_slots_foo(val0, val1, val2) {
		const c0 = childslot_0;
		const c1 = childslot_1;
		const c2 = childslot_2;

		c0.foo = val0;
		c1.foo = val1;
		c2.foo = val2;
	}

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	export function change_childslot_0_foo(value) {
		const c0 = childslot_0;
		c0.foo = value;
	}

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	export function change_childslot_1_foo(value) {
		const c1 = childslot_1;
		c1.foo = value;
	}

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	export function change_childslot_2_foo(value) {
		const c2 = childslot_2;
		c2.foo = value;
	}

	export function change_main_foo(value) {
		foo = value;
	}

	// via "FIX" -> same behavior? : yes, if only 2 accessor-mmember-expression chain members.
	export function change_child_foo(value) {
		const c = child;
		c.foo = value;
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
