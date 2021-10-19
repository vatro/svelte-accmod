export default {
	html: '<div>00</div>',

	async test({ assert, component, target, flush, compileOptions }) {
		const div = target.querySelector('div');
		component.anotherValue = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div>02</div>');
		assert.strictEqual(div, target.querySelector('div'));
	}
};
