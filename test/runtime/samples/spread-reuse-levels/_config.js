export default {
	html: `
		<pre>{"a":1,"b":[1],"c":42}</pre>
		<pre>{"a":false,"b":false,"c":false}</pre>
	`,

	ssrHtml: `
		<pre>{"a":1,"b":[1],"c":42}</pre>
		<pre>{}</pre>
	`,

	test({ assert, component, target, flush }) {
		component.a = 2;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<pre>{"a":2,"b":[1],"c":42}</pre>
			<pre>{"a":true,"b":false,"c":false}</pre>
		`);
	}
};
