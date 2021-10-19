export default {

	async test({ assert, component, target, flush, compileOptions }) {

		// on mount / after first update.
		// REMARK: accessors are async! before first update per default.

		// on mount
		// main 	update: yes
		// child0 	update: yes
		// child0.foo reactive statement: yes

		assert.htmlEqual(target.innerHTML, `
			<p> main updated:   1 </p>
			<p> child0.foo:     1 </p>
			<p> child0 updated: 1 </p>
			<p> child0.foo rs:  1 </p>
		`);


		// change value
		// main 	update: no
		// child0 	update: yes
		// child0.foo reactive statement: yes

		component.child0.foo = 2;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p> main updated:   1 </p>
			<p> child0.foo:     2 </p>
			<p> child0 updated: 2 </p>
			<p> child0.foo rs:  2 </p>
		`);


		// change value
		// main 	update: no
		// child0 	update: yes
		// child0.foo reactive statement: yes

		component.child0.foo = 3;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p> main updated:   1 </p>
			<p> child0.foo:     3 </p>
			<p> child0 updated: 3 </p>
			<p> child0.foo rs:  3 </p>
		`);


		// async (scheduled) accessors
		// main 	update: no
		// child0 	update: yes (only once, not 4 times)
		// child0.foo reactive statement: yes (only once, not 4 times)

		component.child0.foo = 4;
		component.child0.foo = 5;
		component.child0.foo = 6;
		component.child0.foo = 7;
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p> main updated:   1 </p>
			<p> child0.foo:     7 </p>
			<p> child0 updated: 4 </p>
			<p> child0.foo rs:  4 </p>
		`);


		// call function
		// main 	update: no
		// child0 	update: yes
		// child0.foo reactive statement: yes (only if reset-value is truthy)

		component.child0.resetFoo();
		compileOptions.accessorsAsync ? flush() : null;

		assert.htmlEqual(target.innerHTML, `
			<p> main updated:   1 </p>
			<p> child0.foo:     1 </p>
			<p> child0 updated: 5 </p>
			<p> child0.foo rs:  5 </p>
		`);
	}
};
