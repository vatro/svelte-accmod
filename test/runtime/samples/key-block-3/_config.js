// key is not used in the template
export default {
	html: '<div></div>',

	async test({ assert, component, target, flush, compileOptions }) {
		const div = target.querySelector('div');

		component.value = 5;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div></div>');
		assert.notStrictEqual(div, target.querySelector('div'));
	}
};
