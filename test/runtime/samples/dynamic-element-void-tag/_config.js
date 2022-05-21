export default {
	props: {
		propTag: 'hr'
	},
	html: '<h1></h1><col><img><hr><input><br>',

	test({ assert, component, target, flush }) {
		assert.htmlEqual(target.innerHTML, '<h1></h1><col><img><hr><input><br>');
		component.propTag = 'link';
		flush();
		assert.htmlEqual(target.innerHTML, '<h1></h1><col><img><link><input><br>');
	}
};
