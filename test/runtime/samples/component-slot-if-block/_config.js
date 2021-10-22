export default {
	html: `
		<div>
			<p>unconditional</p>
		</div>`,

	test({ assert, component, target, flush }) {
		component.foo = true;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<div>
				<p>unconditional</p>
				<p>conditional</p>
			</div>
		`);
	}
};
