let fulfil;

const promise = new Promise(f => {
	fulfil = f;
});

export default {
	props: {
		x: false,
		promise
	},

	test({ assert, component, target, raf, flush, compileOptions }) {
		component.x = true;
		compileOptions.accessorsAsync ? flush() : null;
		fulfil();

		return promise.then(() => {
			const div = target.querySelector('div');
			assert.equal(div.foo, 0);

			raf.tick(100);
			assert.equal(div.foo, 1);

			component.x = false;
			compileOptions.accessorsAsync ? flush() : null;
			assert.htmlEqual(target.innerHTML, '');

			raf.tick(150);
			assert.equal(div.foo, 1);
		});
	}
};
