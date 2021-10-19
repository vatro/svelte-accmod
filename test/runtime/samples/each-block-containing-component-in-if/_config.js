export default {
	props: {
		show: false,
		fields: [1, 2]
	},

	html: '<div></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.show = true;
		compileOptions.accessorsAsync ? flush() : null;
		component.fields = [1, 2, 3];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual( target.innerHTML, `
			<div>
				<span>1</span>
				<span>2</span>
				<span>3</span>
			</div>
		` );

		component.fields = [1, 2, 3, 4];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual( target.innerHTML, `
			<div>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</div>
		` );
	}
};
