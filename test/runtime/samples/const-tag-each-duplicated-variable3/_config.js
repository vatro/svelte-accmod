export default {
	html: `
			<p>0</p>
			<p>bar: 1,2,3,1,1,2,3,2, num: 1</p>
			<p>bar: 0,2,4,1,0,2,4,2, num: 2</p>
	`,
	async test({ component, target, assert, flush, compileOptions }) {
		assert.htmlEqual(
			target.innerHTML,
			`
				<p>0</p>
				<p>bar: 1,2,3,1,1,2,3,2, num: 1</p>
				<p>bar: 0,2,4,1,0,2,4,2, num: 2</p>
			`
		);

		component.nums = [1, 2, 3];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>0</p>
				<p>bar: 1,2,3,1,1,2,3,2,1,2,3,3, num: 1</p>
				<p>bar: 0,2,4,1,0,2,4,2,0,2,4,3, num: 2</p>
				<p>bar: -100,0,100,1,-100,0,100,2,-100,0,100,3, num: 3</p>
		`
		);
	}
};
