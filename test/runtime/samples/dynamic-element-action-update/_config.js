let logs = [];

export default {
	html: `
		<h1>tag is h1.</h1>
	`,
	props: {
		logs
	},
	after_test() {
		logs = [];
	},

	async test({ assert, component, target, flush }) {
		assert.equal(component.tag, 'h1');

		assert.deepEqual(logs, ['create: h1,opt1']);
		component.opt = 'opt2';
		flush();

		assert.equal(component.tag, 'h1');
		assert.deepEqual(logs, ['create: h1,opt1', 'update: h1,opt2']);

		component.tag = 'h2';
		flush();

		assert.equal(component.tag, 'h2');
		assert.deepEqual(logs, ['create: h1,opt1', 'update: h1,opt2', 'destroy', 'create: h2,opt2']);
		assert.htmlEqual(target.innerHTML, '<h2>tag is h2.</h2>');

		component.tag = false;
		flush();

		assert.deepEqual(logs, ['create: h1,opt1', 'update: h1,opt2', 'destroy', 'create: h2,opt2', 'destroy']);

		assert.htmlEqual(target.innerHTML, '');
	}
};
