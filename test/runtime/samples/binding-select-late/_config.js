export default {
	props: {
		items: [],
		selected: null
	},

	html: `
		<select></select>
		<p>selected: nothing</p>
	`,

	test({ assert, component, target, flush, compileOptions }) {
		component.items = [ 'one', 'two', 'three' ];
		compileOptions.accessorsAsync ? flush() : null;
		component.selected = 'two';
		compileOptions.accessorsAsync ? flush() : null;

		const options = target.querySelectorAll('option');
		assert.ok(!options[0].selected);
		assert.ok(options[1].selected);
		assert.ok(!options[2].selected);

		assert.htmlEqual(target.innerHTML, `
			<select>
				<option value='one'>one</option>
				<option value='two'>two</option>
				<option value='three'>three</option>
			</select>
			<p>selected: two</p>
		`);
	}
};
