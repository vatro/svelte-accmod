export default {
	props: {
		visible: false
	},

	html: '<div><div>before me</div></div>',

	test({ assert, component, target, flush }) {
		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<div><div>i am visible</div><div>before me</div></div>');
	}
};
