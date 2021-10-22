export default {
	html: `
		<p>Hello Alice</p>
		<p>Hello Bob</p>
		<p>Hello Charles</p>
	`,

	test({ assert, component, target, flush }) {
		component.people = ['Alice', 'Charles', 'Bob'];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>Hello Alice</p>
			<p>Hello Charles</p>
			<p>Hello Bob</p>
		`);
	}
};
