export default {
	html: `
		<div><p class='widget'>Hello</p></div>
	`,

	test({ assert, component, target, flush }) {
		component.arriving = false;
		flush();
		assert.htmlEqual(target.innerHTML, "<div><p class='widget'>Goodbye</p></div>");
	}
};
