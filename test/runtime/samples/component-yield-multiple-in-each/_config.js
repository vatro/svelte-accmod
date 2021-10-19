export default {
	html: `
		<p>Hello Alice</p>
		<p>Hello Bob</p>
		<p>Hello Charles</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.people = [ 'Alice', 'Charles', 'Bob' ];
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual( target.innerHTML, `
			<p>Hello Alice</p>
			<p>Hello Charles</p>
			<p>Hello Bob</p>
		`);
	}
};
