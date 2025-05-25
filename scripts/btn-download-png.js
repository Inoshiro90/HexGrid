document.getElementById('btn-download-png').addEventListener('click', () => {
	const canvas = document.getElementById('canvas');
	if (!canvas) {
		alert('Canvas not found!');
		return;
	}

	// Werte aus dem Formular holen
	const sides = document.getElementById('input-field-sideCount').value;
	const seed = document.getElementById('input-field-seed').value;
	const grouping = document.getElementById('input-field-grouping').value;
	const relax = document.getElementById('dropdown-innerRelaxation').value;
	const lineWidth = document.getElementById('input-field-line-width').value;
	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
	const canvasSize = document.getElementById('input-field-size').value;

	// Dateiname zusammensetzen
	const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${
		canvasSize * 0.87
	}.png`;

	// Canvas als PNG exportieren
	const image = canvas.toDataURL('image/png');

	// Temporären Link zum Herunterladen erstellen
	const link = document.createElement('a');
	link.href = image;
	link.download = filename;
	link.click();
});
