export default {
	html: `
		<div>12 120 70, 30+4=34</div>
		<div>35 350 120, 50+7=57</div>
		<div>48 480 140, 60+8=68</div>
	`,
	async test({ component, target, assert, flush }) {
		component.boxes = [];
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
			<div>10 * 2 = 20</div>
		`
		);

		component.constant = 35;
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
			<div>35 * 2 = 70</div>
		`
		);

		component.boxes = [{ width: 3, height: 4 }];
		flush();

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>12 420 245, 105+4=109</div>
		`
		);
	}
};
