<script>
	import { afterUpdate, onMount } from 'svelte';
	import Child from './Child.svelte';
	import ChildSlot from './ChildSlot.svelte';

	let child;
	let updates = 0;

	let childslot_max_depth;

	export let foo = 0;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		const csmd = childslot_max_depth;

		csmd.props_obj = {
			x: 1,
			y: 2,
			z: 3,
		};

		const pobj = csmd.props_obj;

		// IMPORTANT : accessors are 'async' before first update per default (won't trigger immediate flush per statement).
		// 'per default' means (also) in 'unmodified' SVELTE .
		pobj.x = 4;
		pobj.y = 5;
		pobj.z = 6;
	});

	export function set_foo_and_props_obj_in_max_depth_childslot(foo, x, y, z) {
		const csmd = childslot_max_depth;
		const pobj = csmd.props_obj;

		csmd.foo = foo;
		
		pobj.x = x;
		pobj.y = y;
		pobj.z = z;
	}

	export function set_main_foo(value) {
		foo = value;
	}

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
	<ChildSlot depth={0}>
		<ChildSlot depth={1}>
			<ChildSlot depth={2}>
				<ChildSlot depth={3} bind:this={childslot_max_depth} />
			</ChildSlot>
		</ChildSlot>
	</ChildSlot>
</Child>
