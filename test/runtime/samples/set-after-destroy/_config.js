export default {
	props: {
		x: 1
	},

	test({ component, flush }) {
		component.$destroy();
		component.x = 2;
		flush();
	}
};
