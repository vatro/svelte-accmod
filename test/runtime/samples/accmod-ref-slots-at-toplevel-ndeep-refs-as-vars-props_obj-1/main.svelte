<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let childslot_max_depth;

	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		childslot_max_depth.props_obj = {
			x: 1,
			y: 2,
			z: 3,
		};

		childslot_max_depth.props_obj.x = 4;
		childslot_max_depth.props_obj.y = 5;
		childslot_max_depth.props_obj.z = 6;
	});

	export function set_foo_and_props_obj_in_max_depth_childslot(foo, x, y, z) {
		childslot_max_depth.foo = foo;
		childslot_max_depth.props_obj.x = x;
		childslot_max_depth.props_obj.y = y;
		childslot_max_depth.props_obj.z = z;
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
	<ChildSlot depth={0}>
		<ChildSlot depth={1}>
			<ChildSlot depth={2}>
				<ChildSlot depth={3} bind:this={childslot_max_depth} />
			</ChildSlot>
		</ChildSlot>
	</ChildSlot>
</Child>
