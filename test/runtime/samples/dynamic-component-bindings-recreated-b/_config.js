export default {
	props: {
		x: true
	},

	html: `
		<p>parent green</p>
		<p>green green</p>
	`,

	test({ assert, component, target, flush }) {
		component.foo = undefined;
		flush();
		component.x = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>parent red</p>
			<p>red red</p>
		`);

		component.foo = undefined;
		flush();
		component.x = true;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>parent green</p>
			<p>green green</p>
		`);
	}
};
