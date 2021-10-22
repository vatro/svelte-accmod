export default {
	props: {
		x: true
	},

	html: '<canvas data-x="true"></canvas>',

	test({ assert, component, target, flush }) {
		let canvas = target.querySelector('canvas');
		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'true');

		component.x = false;
		flush();
		canvas = target.querySelector('canvas');
		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'false');

		component.x = true;
		flush();
		canvas = target.querySelector('canvas');
		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'true');
	}
};
