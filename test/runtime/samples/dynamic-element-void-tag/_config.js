export default {
	props: {
		propTag: 'hr'
	},
	html: '<h1></h1><col><img><hr><input><br>',

	test({ assert, component, target, flush, compileOptions }) {
		assert.htmlEqual(target.innerHTML, '<h1></h1><col><img><hr><input><br>');
		component.propTag = 'link';
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<h1></h1><col><img><link><input><br>');
	}
};
