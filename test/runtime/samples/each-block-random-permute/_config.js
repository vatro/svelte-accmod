const VALUES = Array.from( 'abcdefghijklmnopqrstuvwxyz' );

function permute () {
	const values = VALUES.slice();
	const number = Math.floor(Math.random() * VALUES.length);
	const permuted = [];
	for (let i = 0; i < number; i++) {
		permuted.push( ...values.splice( Math.floor( Math.random() * ( number - i ) ), 1 ) );
	}

	return {
		data: permuted,
		expected: permuted.length ? `(${permuted.join(')(')})` : ''
	};
}

let step = permute();

export default {
	props: {
		values: step.data
	},

	html: step.expected,

	test({ assert, component, target, flush, compileOptions }) {
		for (let i = 0; i < 100; i++) {
			step = permute();
			component.values = step.data;
			compileOptions.accessorsAsync ? flush() : null;
			assert.htmlEqual( target.innerHTML, step.expected );
		}
	}
};
