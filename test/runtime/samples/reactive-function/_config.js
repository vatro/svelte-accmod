export default {
	html: '<p>50</p>',

	test({ assert, component, target, flush }) {
		component.range = [50, 100];
		flush();
		assert.htmlEqual(target.innerHTML, '<p>75</p>');

		component.range = [50, 60];
		flush();
		assert.htmlEqual(target.innerHTML, '<p>55</p>');

		component.x = 8;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>58</p>');
	}
};
