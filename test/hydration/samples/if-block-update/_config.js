export default {
	props: {
		foo: true,
		bar: false
	},

	snapshot(target) {
		const p = target.querySelector('p');

		return {
			p
		};
	},

	test(assert, target, snapshot, component, window, flush) {
		const p = target.querySelector('p');

		assert.equal(p, snapshot.p);

		component.foo = false;
		flush();
		component.bar = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>bar!</p>');
	}
};
