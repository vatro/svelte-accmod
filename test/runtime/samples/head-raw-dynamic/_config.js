const foo = '<script type="application/json">{ "foo": "true" }</script>';
const bar = '<script type="application/json">{ "bar": "true" }</script>';

export default {
	props: {
		condition: 1,
		foo,
		bar
	},

	test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.document.head.innerHTML.includes(foo), true);

		component.condition = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.head.innerHTML.includes(foo), false);

		component.condition = 2;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.title, 'bar!!!');
		assert.equal(window.document.head.innerHTML.includes(bar), true);
		assert.equal(Boolean(window.document.getElementById('meta')), true);

		component.condition = false;
		compileOptions.accessorsAsync ? flush() : null;
		assert.equal(window.document.head.innerHTML.includes(bar), false);
		assert.equal(window.document.getElementById('meta'), null);
	}
};
