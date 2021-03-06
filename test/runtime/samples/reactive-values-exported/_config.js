export default {
	props: {
		x: 1
	},

	html: `
		<p>1 1 1</p>
	`,

	test({ assert, component, flush }) {
		assert.equal(component.y, 1);
		assert.equal(component.z, 1);

		component.x = 2;
		flush();
		assert.equal(component.y, 2);
		assert.equal(component.z, 2);
	}
};
