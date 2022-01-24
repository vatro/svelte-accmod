export default {

	async test({ assert, component, target, flush }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		component.process_array();
		flush();

		assert.htmlEqual(target.innerHTML, `
			script_error?: no
			outputs_queue[0].bar[0]: 1
			outputs_queue[0].bar[1]: something_0
			outputs_queue[1].bar[0]: 2
			outputs_queue[1].bar[1]: something_1
			outputs_queue[2].bar[0]: 3
			outputs_queue[2].bar[1]: something_2
		`);
		
	}
};
