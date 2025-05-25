document.getElementById('btn-random-seed').addEventListener('click', () => {
	const randomSeed = Math.floor(Math.random() * 65535) + 1;

	const seedRange = document.getElementById('input-field-seed');
	const seedNumber = seedRange.nextElementSibling; // Das entsprechende <input type="number">

	seedRange.value = randomSeed;
	seedNumber.value = randomSeed;

	// // Falls du die dirty-Mechanik nutzt
	// if (typeof setAsDirty === 'function') {
	//     setAsDirty();
	// }
});