const foo = '<script type="application/json">{ "foo": "true" }</script>';
const bar = '<script type="application/json">{ "bar": "true" }</script>';

export default {
	props: {
		condition: false,
		foo,
		bar
	},

	test({ assert, component, window, flush }) {
		assert.equal(window.document.head.innerHTML.includes(foo), false);
		assert.equal(window.document.head.innerHTML.includes(bar), true);

		component.condition = true;
		flush();
		assert.equal(window.document.head.innerHTML.includes(foo), true);
		assert.equal(window.document.head.innerHTML.includes(bar), false);
	}
};
