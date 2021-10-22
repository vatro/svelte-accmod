export default {
	props: {
		visible: false,
		things: ['a', 'b', 'c', 'd']
	},

	// intro: true,

	html: `
		<p>waiting...</p>
	`,

	async test({ assert, component, target, raf, flush }) {
		component.visible = true;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>introstart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`);

		await raf.tick(50);

		assert.deepEqual(component.intros.sort(), ['a', 'b', 'c', 'd']);
		assert.equal(component.intro_count, 4);

		await raf.tick(100);
		assert.equal(component.intro_count, 0);

		assert.htmlEqual(target.innerHTML, `
			<p>introend</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`);

		component.visible = false;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>outrostart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`);

		await raf.tick(150);
		assert.deepEqual(component.outros.sort(), ['a', 'b', 'c', 'd']);
		assert.equal(component.outro_count, 4);

		await raf.tick(200);
		assert.equal(component.outro_count, 0);

		component.visible = true;
		flush();

		await raf.tick(250);
		assert.deepEqual(component.intros.sort(), ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd']);
		assert.equal(component.intro_count, 4);

		assert.htmlEqual(target.innerHTML, `
			<p>introstart</p>
			<p>a</p>
			<p>b</p>
			<p>c</p>
			<p>d</p>
		`);
	}
};
