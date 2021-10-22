export default {
	props: {
		x: true
	},

	test({ component, flush }) {
		component.x = false;
		flush();
	}
};
