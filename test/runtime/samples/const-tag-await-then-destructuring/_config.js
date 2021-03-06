export default {
	html: '<div>12 120 70, 30+4=34</div>',
	async test({ component, target, assert, flush }) {
		component.promise1 = Promise.resolve({ width: 5, height: 6 });
		flush();

		component.promise2 = Promise.reject({ width: 6, height: 7 });
		flush();

		await Promise.resolve();
		assert.htmlEqual(target.innerHTML, `
			<div>30 300 110, 50+6=56</div>
			<div>42 420 130, 60+7=67</div>
		`);

		component.constant = 20;
		flush();

		assert.htmlEqual(target.innerHTML, `
			<div>30 600 220, 100+6=106</div>
			<div>42 840 260, 120+7=127</div>
		`);
	}
};
