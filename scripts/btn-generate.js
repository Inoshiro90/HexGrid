document.getElementById('btn-generate').addEventListener('click', () => {
	// Hier führst du dann dein Generierungslogik mit `options` aus
	updateCanvasSize();
	setAsDirty(); // Falls notwendig
	drawOnce();
});
