// key is not used in the template
export default {
	html: '<div></div>',

	async test({ assert, component, target, flush }) {
		const div = target.querySelector('div');

		component.value = 5;
		flush();
		assert.htmlEqual(target.innerHTML, '<div></div>');
		assert.notStrictEqual(div, target.querySelector('div'));
	}
};
