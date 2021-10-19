import { writable } from '../../../../store';

export default {
	html: `
		<p>undefined</p>
	`,
	async test({ assert, component, target, flush, compileOptions }) {
		component.store = writable('foo');
		compileOptions.accessorsAsync ? flush() : null;
		assert.htmlEqual(target.innerHTML, `
			<p>foo</p>
		`);
	}
};
