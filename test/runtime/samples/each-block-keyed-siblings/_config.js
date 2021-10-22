export default {
	props: {
		ones: [{ text: '1' }],
		twos: [{ text: '2' }]
	},

	html: `
		<div>1</div>
		<div>2</div>
	`,

	test({ assert, component, target, flush }) {
		component.ones = [{ text: '11' }];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>11</div>
			<div>2</div>
		`);
	}
};
