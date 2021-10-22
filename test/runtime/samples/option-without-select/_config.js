export default {
	props: {
		foo: 'hello'
	},

	html: "<option value='hello'>hello</option>",

	test({ assert, component, target, flush }) {
		component.foo = 'goodbye';
		flush();
		assert.htmlEqual(target.innerHTML, `
			<option value='goodbye'>goodbye</option>
		`);
	}
};
