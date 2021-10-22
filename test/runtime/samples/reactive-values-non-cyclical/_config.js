export default {
	props: {
		x: 42
	},

	html: `
		<p>42 42</p>
	`,

	test({ assert, component, target, flush }) {
		component.x = 43;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>43 43</p>
		`);
	}
};
