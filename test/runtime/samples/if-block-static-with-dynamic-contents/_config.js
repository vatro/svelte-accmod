export default {
	props: {
		foo: 42
	},

	html: '<p>42</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.foo = 43;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>43</p>');
	}
};
