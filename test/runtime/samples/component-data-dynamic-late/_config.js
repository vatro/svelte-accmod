export default {
	test({ assert, component, target, flush }) {
		component.q = 42;
		flush();
		component.foo = true;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>42</p>
		` );
	}
};
