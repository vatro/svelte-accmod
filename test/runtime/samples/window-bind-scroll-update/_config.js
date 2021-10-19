import { env, useFakeTimers } from '../../../helpers';

let clock;

export default {
	before_test()  {
		clock = useFakeTimers();

		const window = env();
		Object.defineProperties(window, {
			pageYOffset: {
				value: 0,
				configurable: true
			},
			pageXOffset: {
				value: 0,
				configurable: true
			}
		});
	},

	after_test() {
		clock.removeFakeTimers();
		clock = null;
	},

	async test({ assert, component, window, flush, compileOptions }) {
		assert.equal(window.pageYOffset, 0);

		// clear the previous 'scrolling' state
		clock.flush();
		component.scrollY = 100;
		compileOptions.accessorsAsync ? flush() : null;

		clock.flush();
		assert.equal(window.pageYOffset, 100);
	}
};
