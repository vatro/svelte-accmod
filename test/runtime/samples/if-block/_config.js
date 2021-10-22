export default {
	props: {
		visible: true
	},

	html: '<p>i am visible</p>',

	test({ assert, component, target, flush }) {
		component.visible = false;
		flush();
		assert.htmlEqual(target.innerHTML, '');
		component.visible = true;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>i am visible</p>');
	}
};
