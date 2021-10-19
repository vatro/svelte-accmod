export default {
	props: {
		x: 42
	},

	html: `
		<p>42 42</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.x = 43;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p>43 43</p>
		`);
	}
};
