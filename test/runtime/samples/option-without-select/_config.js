export default {
	props: {
		foo: 'hello'
	},

	html: "<option value='hello'>hello</option>",

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = 'goodbye';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<option value='goodbye'>goodbye</option>
		`);
	}
};
