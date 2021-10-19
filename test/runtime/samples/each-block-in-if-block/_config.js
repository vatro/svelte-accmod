export default {
	props: {
		dummy: false,
		fruits: ['Apple', 'Banana', 'Tomato']
	},

	html: '<div><div>Apple</div><div>Banana</div><div>Tomato</div></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.dummy = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><div>Apple</div><div>Banana</div><div>Tomato</div></div>' );
	}
};
