export default {
	html: '<div>20 x 40</div>',
	props: {
		boxes: [{ width: 20, height: 40 }]
	},
	async test({ component, target, assert, flush }) {
		component.boxes = [{ width: 30, height: 60 }];
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
		<div>30 x 60</div>
		`
		);

		component.boxes = [
			{ width: 20, height: 40 },
			{ width: 30, height: 50 }
		];
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
		<div>20 x 40</div>
		<div>30 x 50</div>
		`
		);

		component.boxes = [
			{ width: 80, height: 70 },
			{ width: 90, height: 60 }
		];
		flush();
		assert.htmlEqual(
			target.innerHTML,
			`
		<div>80 x 70</div>
		<div>90 x 60</div>
		`
		);

		component.boxes = [
			{ width: 20, height: 40 },
			{ width: 30, height: 50 },
			{ width: 30, height: 50 }
		];
		flush();
		assert.htmlEqual(target.innerHTML, '<div>3</div>');

		component.boxes = [];
		flush();
		assert.htmlEqual(target.innerHTML, '<div>0</div>');
	}
};
