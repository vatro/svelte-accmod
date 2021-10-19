<script>
	import { afterUpdate, onMount } from "svelte";
	import Child from "./Child.svelte";
	import ChildSlot from "./ChildSlot.svelte";

	let child;
	let updates = 0;

	let childslot_max_depth;

	export let foo = undefined;
	let rs_foo = 0;

	$: foo ? rs_foo++ : null;

	onMount(() => {
		// REMARK: accessors are 'async' (won't trigger immediate flush) before first update per default.
		const csmd = childslot_max_depth;
		const c = csmd;

		c.props_obj = {
			x: 1,
			y: 2,
			z: 3,
		};

		const pobj = csmd.props_obj;
		const o = pobj;

		o.x = 4;
		o.y = 5;
		o.z = 6;
	});

	// IMPORTANT: When the component reference is being rereferenced in a function, 'accmod' behaves the same way as native Svelte,
	// because the modified invalidation is NOT being used -> accessor-statements are not being wrapped by $$invalidate(..),
	// so 'accmod' uses the original invalidation routine. This means we will not get unwanted components updates ("FIX"), BUT
	// just as with native Svelte changing the 'props_obj' will not trigger related reactive statements and will not update the component / DOM.
	//
	// CONCLUSION: When rereferencing components native and 'accmod' behaviors will be the same, INCL. THE BAD PART of e.g. like here
	// the 'prop_obj' not triggering reactive statements / not updating DOM!
	//
	// WHICH MEANS (VERY IMPORTANT):
	// In order to get the BEST (intended) 'accmod' functionality the HEAD of an
	// accessors-member-expression MUST be a component reference AND ...
	// - ... saved in a variable declared at component's top-level (of any component)
	// - ... saved in an object ({},[]) declared at component's top-level (of any component)

	// BAD! -> unwanted behavior! (see above)
	export function set_foo_and_props_obj_in_max_depth_childslot(foo, x, y, z) {
		
		const csmd = childslot_max_depth;
		const c = csmd;
		const pobj = c.props_obj;
		const o = pobj;
	
		c.foo = foo;
		o.x = x;
		o.y = y;
		o.z = z;
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
