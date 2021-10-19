export default {
	props: {
		visible: false,
		threshold: 5
	},

	html: `
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
		<div>5</div>
	`,

	test({ assert, component, target, raf, flush, compileOptions }) {
		raf.tick(100);

		component.threshold = 4;
		compileOptions.accessorsAsync ? flush() : null;

		raf.tick(200);
		assert.htmlEqual(target.innerHTML, `
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
		`);
	}
};
