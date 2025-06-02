// function updateCanvasSize() {
// 	const baseSize = parseInt(document.getElementById('input-field-size').value, 10) || 500;
// 	const aspectRatio = 935 / 1080;

// 	const canvasHeight = baseSize;
// 	const canvasWidth = Math.round(canvasHeight * aspectRatio);

// 	const canvas = document.getElementById('canvas');
// 	canvas.width = canvasWidth;
// 	canvas.height = canvasHeight;

// 	// KEINE Transformation hier setzen – das übernimmt drawGrid()
// }

function updateCanvasSize() {
	const baseSize = parseInt(document.getElementById('input-field-size').value, 10) || 500;
	const aspectRatio = 935 / 1080;

	const canvasHeight = baseSize;
	const canvasWidth = Math.round(canvasHeight * aspectRatio);

	const angles = [0, 60, 120, 180, 240, 300];

	angles.forEach(angle => {
		const suffix = angle === 0 ? '' : `_${angle}`;
		const canvas = document.getElementById(`canvas${suffix}`);
		if (!canvas) return;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	});
}