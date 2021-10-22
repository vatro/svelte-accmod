export default {
	html: `
		<p slot='one'>one: 1 two: 2</p>
	`,
	test({ assert, component, target, flush }) {
		component.a = 3;
		flush();
		component.b = 4;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p slot='one'>one: 3 two: 4</p>
		`);

		component.a = 5;
		flush();
		component.b = 6;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p slot='one'>one: 5 two: 6</p>
		`);
	}
};
