function updateCanvasSize() {
	const baseSize = parseInt(document.getElementById('input-field-size').value, 10) || 500;
	const aspectRatio = 935 / 1080;

	const canvasHeight = baseSize;
	const canvasWidth = Math.round(canvasHeight * aspectRatio);

	const canvas = document.getElementById('canvas');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	// KEINE Transformation hier setzen – das übernimmt drawGrid()
}
