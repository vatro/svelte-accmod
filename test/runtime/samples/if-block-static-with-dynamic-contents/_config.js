export default {
	props: {
		foo: 42
	},

	html: '<p>42</p>',

	test({ assert, component, target, flush }) {
		component.foo = 43;
		flush();
		assert.htmlEqual(target.innerHTML, '<p>43</p>');
	}
};
