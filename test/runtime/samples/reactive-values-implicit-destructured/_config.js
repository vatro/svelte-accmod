export default {
	props: {
		coords: [0, 0],
		numbers: { answer: 42 }
	},

	html: `
		<p>0,0</p>
		<p>42</p>
	`,

	test({ assert, component, target, flush }) {
		component.coords = [1, 2];
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>1,2</p>
			<p>42</p>
		`);

		component.numbers = { answer: 43 };
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>1,2</p>
			<p>43</p>
		`);
	}
};
