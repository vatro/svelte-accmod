<script>
	import { afterUpdate } from 'svelte';

	let updates = 0;

	// IMPORTANT  exporting 'obj' will enable 'accmod' rereferencing feature,
	// allowing simplified, reactive syntax when updating arrays and objects.
	export let obj = {
		foo: {
			bar: {
				baz: {
					arr: [1, 2, 3],
				},
			},
		},
	};

	let rs_obj_foo_bar_baz_arr_triggered = 0;
	let rs_obj_foo_bar_baz_arr = [0, 0, 0];

	$: {
		rs_obj_foo_bar_baz_arr = [...obj.foo.bar.baz.arr];
		rs_obj_foo_bar_baz_arr_triggered++;
	}

	export function change_items_of_obj_foo_bar_baz_arr_benefit(new_arr) {
		const _arr = obj.foo.bar.baz.arr;

		_arr[0] = new_arr[0];
		_arr[1] = new_arr[1];
		_arr[2] = new_arr[2];
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}
obj.foo.bar.baz.arr: [{obj.foo.bar.baz.arr.toString()}]
rs_obj_foo_bar_baz_arr triggered: {rs_obj_foo_bar_baz_arr_triggered}
rs_obj_foo_bar_baz_arr: [{rs_obj_foo_bar_baz_arr.toString()}]
