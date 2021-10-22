export default {
	props: {
		values: [1, 2, 3, 4]
	},

	test({ component, flush }) {
		component.values = [2, 3];
		flush();
	}
};
