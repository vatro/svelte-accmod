<script>
	import { afterUpdate } from 'svelte';

	let updates = 0;

	// IMPORTANT  exporting 'obj' will enable 'accmod' rereferencing feature,
	// allowing simplified, reactive syntax when updating arrays and objects.
	export let obj = {
		foo: {
			bar: 0,
		},
	};

	let rs_obj_foo_bar_triggered = 0;
	let rs_obj_foo_bar = undefined;

	$: {
		rs_obj_foo_bar = obj.foo.bar;
		rs_obj_foo_bar_triggered++;
	}

	export function change_obj_foo_bar_benefit(value) {
		// COOL!: in 'unmodified' SVELTE  this would't be reactive!
		// see https://svelte.dev/tutorial/updating-arrays-and-objects
		const _foo = obj.foo;
		_foo.bar = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}
obj.foo.bar: {obj.foo.bar}
rs_obj_foo_bar triggered: {rs_obj_foo_bar_triggered}
rs_obj_foo_bar: {rs_obj_foo_bar}
