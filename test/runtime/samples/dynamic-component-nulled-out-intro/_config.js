export default {
	test({ component, flush }) {
		component.visible = true;
		flush();
	}
};
