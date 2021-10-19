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

	test(assert, target, snapshot, component, window, accessorsAsync, flush) {
		const p = target.querySelector('p');

		assert.equal(p, snapshot.p);

		component.foo = false;
		accessorsAsync ? flush() : null;
		component.bar = true;
		accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>bar!</p>');
	}
};
