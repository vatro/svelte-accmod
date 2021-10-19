export default {
	props: {
		titles: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
	},

	html: '<div class="container"><p>a</p><p>b</p><p>c</p></div>',

	test({ assert, component, target, flush, compileOptions }) {
		component.titles = [{ name: 'b' }, { name: 'c' }, { name: 'a' }];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, '<div class="container"><p>b</p><p>c</p><p>a</p></div>');
	}
};
