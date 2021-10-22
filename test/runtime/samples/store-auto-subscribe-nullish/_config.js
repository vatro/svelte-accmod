import { writable } from '../../../../store';

export default {
	html: `
		<p>undefined</p>
	`,
	async test({ assert, component, target, flush }) {
		component.store = writable('foo');
		flush();
		assert.htmlEqual(target.innerHTML, `
			<p>foo</p>
		`);
	}
};
