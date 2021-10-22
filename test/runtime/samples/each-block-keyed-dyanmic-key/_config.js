let count = 0;
let value = 'foo';

export default {
	props: {
		value() {
			count++;
			return value;
		}
	},

	before_test() {
		count = 0;
	},

	html: `
		<div>foo</div>
		<div>foo</div>
	`,

	test({ assert, component, target, flush }) {
		value = 'bar';
		component.id = 1;
		flush();

		assert.equal(count, 4);
		assert.htmlEqual(target.innerHTML, `
			<div>bar</div>
			<div>bar</div>
		`);
	}
};
