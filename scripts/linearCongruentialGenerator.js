// a LCG to use as a seedable RNG
function linearCongruentialGenerator(seed) {
	let state = seed;

	return function () {
		const result = (state * 48271) % 2147483647;
		state = result;
		return result / 2147483647;
	};
}