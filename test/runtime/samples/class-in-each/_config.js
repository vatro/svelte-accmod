export default {
	props: {
		things: ['one', 'two', 'three'],
		selected: 'two'
	},

	html: `
		<div></div>
		<div class="selected"></div>
		<div></div>
	`,

	test({ assert, component, target, flush }) {
		component.selected = 'three';
		flush();
		assert.htmlEqual(target.innerHTML, `
			<div></div>
			<div class=""></div>
			<div class="selected"></div>
		`);
	}
};
