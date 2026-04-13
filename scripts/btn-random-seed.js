document.getElementById('btn-random-seed').addEventListener('click', () => {
	const randomSeed = Math.floor(Math.random() * 2147483646);

	const seedRange = document.getElementById('input-field-seed');
	const seedNumber = document.getElementById('input-field-seed-slider'); // Das entsprechende <input type="number">

	seedRange.value = randomSeed;
	seedNumber.value = randomSeed;

	// // Falls du die dirty-Mechanik nutzt
	// if (typeof setAsDirty === 'function') {
	//     setAsDirty();
	// }
});
