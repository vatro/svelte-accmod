export default {
	props: {
		visible: false
	},

	html: '<div><div>before me</div></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.visible = true;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<div><div>i am visible</div><div>before me</div></div>' );
	}
};
