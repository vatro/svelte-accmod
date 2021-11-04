<script>
	import { afterUpdate } from 'svelte';

	let updates = 0;

	// IMPORTANT  exporting 'obj' will enable 'accmod' rereferencing feature,
	// allowing simplified, reactive syntax when updating arrays and objects.
	export let obj = {
		foo: {
			bar: {
				baz: {
					val: 'initial obj.foo.bar.baz.val value',
				},
			},
		},
	};

	let rs_obj_foo_bar_baz_val_triggered = 0;
	let rs_obj_foo_bar_baz_val = undefined;

	$: {
		rs_obj_foo_bar_baz_val = obj.foo.bar.baz.val;
		rs_obj_foo_bar_baz_val_triggered++;
	}

	export function change_obj_foo_bar_baz_val_benefit(value) {
		const _baz = obj.foo.bar.baz;
		_baz.val = value;
	}

	afterUpdate(() => {
		updates++;
	});
</script>

main updates: {updates}
obj.foo.bar.baz.val: {obj.foo.bar.baz.val}
rs_obj_foo_bar_baz_val triggered: {rs_obj_foo_bar_baz_val_triggered}
rs_obj_foo_bar_baz_val: {rs_obj_foo_bar_baz_val}
