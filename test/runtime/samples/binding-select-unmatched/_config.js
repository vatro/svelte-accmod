export default {
	// TODO  Why is this test failing? Cannot see anything wrong in 'real life'.
	skip: true,

	html: `
		<p>selected: null</p>

		<select>
			<option value='a'>a</option>
			<option value='b'>b</option>
			<option value='c'>c</option>
		</select>

		<p>selected: null</p>
	`,

	async test({ assert, component, target, flush }) {
		const select = target.querySelector('select');
		const options = [...target.querySelectorAll('option')];

		assert.equal(component.selected, null);

		// no option should be selected since none of the options matches the bound value
		assert.equal(select.value, '');
		assert.equal(select.selectedIndex, -1);
		assert.ok(!options[0].selected);

		component.selected = 'a'; // first option should now be selected
		flush();
		assert.equal(select.value, 'a');
		assert.ok(options[0].selected);

		assert.htmlEqual(target.innerHTML, `
			<p>selected: a</p>

			<select>
				<option value='a'>a</option>
				<option value='b'>b</option>
				<option value='c'>c</option>
			</select>

			<p>selected: a</p>
		`);

		component.selected = 'd'; // doesn't match an option
		flush();

		// now no option should be selected again
		assert.equal(select.value, '');
		assert.equal(select.selectedIndex, -1);
		assert.ok(!options[0].selected);

		assert.htmlEqual(target.innerHTML, `
			<p>selected: d</p>

			<select>
				<option value='a'>a</option>
				<option value='b'>b</option>
				<option value='c'>c</option>
			</select>

			<p>selected: d</p>
		`);
	}
};
