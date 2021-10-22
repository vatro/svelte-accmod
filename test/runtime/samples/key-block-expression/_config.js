export default {
	html: '<div>000</div>',

	async test({ assert, component, target, flush }) {
		let div = target.querySelector('div');
		component.value = 2;
		flush();
		assert.htmlEqual(target.innerHTML, '<div>200</div>');
		assert.notStrictEqual(div, target.querySelector('div'));

		div = target.querySelector('div');

		component.anotherValue = 5;
		flush();
		assert.htmlEqual(target.innerHTML, '<div>250</div>');
		assert.notStrictEqual(div, target.querySelector('div'));

		div = target.querySelector('div');

		component.thirdValue = 9;
		flush();
		assert.htmlEqual(target.innerHTML, '<div>259</div>');
		assert.strictEqual(div, target.querySelector('div'));

		// make dirty while maintain the value of `value + anotherValue`
		// should update the content, but not recreate the elements
		await component.$set({ value: 4, anotherValue: 3 });

		assert.htmlEqual(target.innerHTML, '<div>439</div>');
		assert.strictEqual(div, target.querySelector('div'));
	}
};
