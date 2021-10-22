export default {
	html: `
		<div>
			<span slot="a">static</span>
			<span slot="b">0</span>
		</div>
	`,

	test({ assert, component, target, flush }) {
		component.dynamic += 1;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>
				<span slot="a">static</span>
				<span slot="b">1</span>
			</div>
		`);
	}
};
