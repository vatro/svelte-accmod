export default {
	props: {
		x: true
	},

	html: `
		<h1>Foo</h1>
		<div id="default">
		  <h1>This is default slot</h1>
		</div>
		<div id="other">
		  <h1 slot='other'>This is other slot</h1>
		</div>
	`,

	test({ assert, component, target, flush }) {
		component.tag = 'h2';
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1>Foo</h1>
			<div id="default">
				<h2>This is default slot</h2>
			</div>
			<div id="other">
				<h2 slot='other'>This is other slot</h2>
			</div>
		`
		);
	}
};
