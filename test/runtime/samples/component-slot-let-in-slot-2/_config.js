let logs;
function log(value) {
	logs.push(value);
}

export default {
	props: {
		prop: 'a',
		log
	},
	html: '<button></button>',
	before_test() {
		logs = [];
	},
	async test({ assert, component, target, window, flush, compileOptions }) {
		const button = target.querySelector('button');
		await button.dispatchEvent(new window.MouseEvent('click'));

		assert.deepEqual(logs, ['a']);

		component.prop = 'b';
		compileOptions.accessorsAsync ? flush() : null;
		await button.dispatchEvent(new window.MouseEvent('click'));
		assert.deepEqual(logs, ['a', 'b']);
	}
};
