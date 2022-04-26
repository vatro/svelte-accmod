export default {
	html: `
		<p>bar: 1,2,3,0,2,4,-100,0,100, num: 1</p>
		<p>bar: 1,2,3,0,2,4,-100,0,100, num: 2</p>
		<p>bar: 1,2,3,0,2,4,-100,0,100, num: 3</p>
	`,
	async test({ component, target, assert, flush, compileOptions }) {
		assert.htmlEqual(
			target.innerHTML,
			`
			  <p>bar: 1,2,3,0,2,4,-100,0,100, num: 1</p>
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 2</p>
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 3</p>
			`
		);

		component.nums = [1, 2, 3, 4];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 1</p>
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 2</p>
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 3</p>
				<p>bar: 1,2,3,0,2,4,-100,0,100, num: 4</p>
		`
		);
	}
};
