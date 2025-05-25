function updateCanvasSize() {
	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10) || 500;

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	canvas.height = canvasSize;
	canvas.width = Math.round(canvas.height * 0.87);

	// canvas.height = parseInt(document.getElementById('input-field-size').value, 10);
	// canvas.width = Math.round((canvas.height * 157) / 180);

	context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
	context.translate(canvasSize * 0.435, canvasSize * 0.5);
	context.scale(canvasSize * 0.5, canvasSize * 0.5);
}
