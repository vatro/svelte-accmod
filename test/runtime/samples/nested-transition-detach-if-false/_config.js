export default {
	html: `
		<li>
			<span>a</span>
			<ul>
				<li>
					<span>a/b</span>
					<ul>
						<li>a/b/c</li>
					</ul>
				</li>
			</ul>
		</li>
	`,

	test({ assert, component, target, flush }) {
		component.folder.open = false;
		flush();
		assert.htmlEqual(target.innerHTML, `
			<li>
				<span>a</span>
			</li>
		`);
	}
};
