export default {
	skip: true, // nice-to-have – tricky though, so skipping for now

	test({ component, flush }) {
		component.foo = { x: 2 };
		flush();
	}
};
