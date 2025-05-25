function drawGrid(drawPositions, drawSectors) {
	context.clearRect(-2, -2, 4, 4);
	context.strokeStyle = document.getElementById('input-field-line-color').value;
	context.lineWidth = document.getElementById('input-field-line-width').value / 1000;
	context.lineCap = context.lineJoin = 'round';
	// context.lineOpacity = document.getElementById('input-field-line-color-transparency').value;
	context.beginPath();
	for (let i = 0; i < grid.points.length; i++) {
		const point = grid.points[i];
		const neighbours = grid.neighbours[i];

		for (let k = 0; k < neighbours.length; k++) {
			const npoint = grid.points[neighbours[k]];

			context.moveTo(point[0], point[1]);
			context.lineTo(npoint[0], npoint[1]);
		}
	}
	context.stroke();
}