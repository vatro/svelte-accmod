export default {

	props: {
		raw: '<span><em>raw html!!!\\o/</span></em>'
	},

	html: 'before<span><em>raw html!!!\\o/</span></em>after',

	test({ assert, component, target, flush }) {
		component.raw = '';
		flush();
		assert.equal(target.innerHTML, 'beforeafter');
		component.raw = 'how about <strong>unclosed elements?';
		flush();
		assert.equal(target.innerHTML, 'beforehow about <strong>unclosed elements?</strong>after');
		component.$destroy();
		assert.equal(target.innerHTML, '');
	}
};
