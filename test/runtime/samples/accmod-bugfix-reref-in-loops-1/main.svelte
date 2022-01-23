<script>
	import { afterUpdate } from 'svelte';


	let outputs = [
		{foo: 1},
		{foo: 2},
		{foo: 3}
	]

	// IMPORTANT  exporting 'outputs_queue' would make it reactive,
	// this way it's only 'visible' / usable as reref-head.
	let outputs_queue = []

	export function process_array() {

		for (let i = 0; i < outputs.length; i++) {
			const output = outputs[i]

			outputs_queue.push({
				foo_value: output.foo
			})
		}

		for (let j = 0; j < outputs_queue.length; j++) {
			// works / worked
			// outputs_queue[j].bar = [outputs_queue[j].foo, "something"]

			// works now / didn't work, 'head_ctx_i' was 'undefined' -> 'outputs_queue' was not in $$.ctx
			// now it's being manually pushed into it, see 'invalidate.ts'.
			const output = outputs_queue[j]
			output.bar = [output.foo_value, `something_${j}`]
		}

		script_error = "no"
	}

	let script_error = "yes"

	afterUpdate(() => {
		//console.log("App update!")
	});

</script>
script_error?: {script_error}
{#if script_error === "no"}
	outputs_queue[0].bar[0]: {outputs_queue[0].bar[0]}
	outputs_queue[0].bar[1]: {outputs_queue[0].bar[1]}
	outputs_queue[1].bar[0]: {outputs_queue[1].bar[0]}
	outputs_queue[1].bar[1]: {outputs_queue[1].bar[1]}
	outputs_queue[2].bar[0]: {outputs_queue[2].bar[0]}
	outputs_queue[2].bar[1]: {outputs_queue[2].bar[1]}
{/if}