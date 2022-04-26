export default {
	html: `
		<p>1</p>
		<p>3,6,9</p>
		<p>2</p>
		<p>3,6,9</p>
		<p>3</p>
		<p>3,6,9</p>
	`,
	test({ component, target, assert, flush, compileOptions }) {
		component.baz = 5;
		compileOptions.accessorsAsync ? flush() : null;
		
		assert.htmlEqual(
			target.innerHTML,
			`
			<p>1</p>
			<p>5,10,15</p>
			<p>2</p>
			<p>5,10,15</p>
			<p>3</p>
			<p>5,10,15</p>
		`
		);

		component.array = [3, 4, 5];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(
			target.innerHTML,
			`
			<p>3</p>
			<p>15,20,25</p>
			<p>4</p>
			<p>15,20,25</p>
			<p>5</p>
			<p>15,20,25</p>
		`
		);
	}
};
