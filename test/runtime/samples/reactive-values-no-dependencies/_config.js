export default {
	html: `
		<p>10 - 90</p>
	`,

	test({ assert, component, target, flush }) {
		component.width = 50;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>10 - 40</p>
		`);
	}
};
