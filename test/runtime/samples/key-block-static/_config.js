export default {
	html: '<div>00</div>',

	async test({ assert, component, target, flush }) {
		const div = target.querySelector('div');
		component.anotherValue = 2;
		flush();
		assert.htmlEqual(target.innerHTML, '<div>02</div>');
		assert.strictEqual(div, target.querySelector('div'));
	}
};
