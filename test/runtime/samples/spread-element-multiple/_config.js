export default {
	props: {
		a: {
			'data-one': 1,
			'data-two': 2
		},
		c: {
			'data-b': 'overridden'
		},
		d: 'deeeeee'
	},

	html: `
		<div data-one="1" data-two="2" data-b="overridden" data-d="deeeeee" >test</div>
	`,

	test({ assert, component, target, flush }) {
		component.a = {
			'data-one': 10
		};
		flush();
		component.c = {
			'data-c': 'new'
		};
		flush();
		component.d = 'DEEEEEE';
		flush();

		assert.htmlEqual(
			target.innerHTML,
			'<div data-one="10" data-b="b" data-c="new" data-d="DEEEEEE" >test</div>'
		);
	}
};
