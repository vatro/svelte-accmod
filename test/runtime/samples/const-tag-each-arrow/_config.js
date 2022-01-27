export default {
	html: `
			<p>#FF0000</p>
			<p>#00FF00</p>
			<p>#0000FF</p>
	`,
	async test({ component, target, assert, flush }) {
		component.constant = 20;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>#FF0000</p>
			<p>#00FF00</p>
			<p>#0000FF</p>
		`);

		component.tags = [
			{
				name: 'Red',
				color: '#FF0000'
			},
			{
				name: 'Green',
				color: '#00FF00'
			},
			{
				name: 'Blue',
				color: '#0000FF'
			},
			{
				name: 'Black',
				color: '#000000'
			},
			{
				name: 'White',
				color: '#FFFFFF'
			}
		];
		flush();

		assert.htmlEqual(target.innerHTML, `
			<p>#FF0000</p>
			<p>#00FF00</p>
			<p>#0000FF</p>
			<p>#000000</p>
			<p>#FFFFFF</p>
		`);
	}
};
