export default {
	html: '<p>50</p>',

	test({ assert, component, target, flush, compileOptions }) {
		component.range = [50, 100];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>75</p>');

		component.range = [50, 60];
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>55</p>');

		component.x = 8;
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, '<p>58</p>');
	}
};
