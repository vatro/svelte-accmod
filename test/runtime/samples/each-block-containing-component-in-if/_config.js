export default {
	props: {
		show: false,
		fields: [1, 2]
	},

	html: '<div></div>',

	test({ assert, component, target, flush }) {
		component.show = true;
		flush();
		component.fields = [1, 2, 3];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>
				<span>1</span>
				<span>2</span>
				<span>3</span>
			</div>
		` );

		component.fields = [1, 2, 3, 4];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
			</div>
		` );
	}
};
