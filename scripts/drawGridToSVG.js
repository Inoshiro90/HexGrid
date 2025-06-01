function drawGridToSVG(grid, options) {
	const xmlns = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS(xmlns, 'svg');
	const size = parseInt(document.getElementById('input-field-size').value, 10);
	svg.setAttribute('width', size);
	svg.setAttribute('height', size * aspectRatio);
	svg.setAttribute('viewBox', '-2 -2 4 4');
	svg.setAttribute('xmlns', xmlns);

	const lineColor = document.getElementById('input-field-line-color').value;
	const lineWidth = document.getElementById('input-field-line-width').value ;

	for (let i = 0; i < grid.points.length; i++) {
		const point = grid.points[i];
		const neighbours = grid.neighbours[i];

		for (let k = 0; k < neighbours.length; k++) {
			const npoint = grid.points[neighbours[k]];

			const line = document.createElementNS(xmlns, 'line');
			line.setAttribute('x1', point[0]);
			line.setAttribute('y1', point[1]);
			line.setAttribute('x2', npoint[0]);
			line.setAttribute('y2', npoint[1]);
			line.setAttribute('stroke', lineColor);
			line.setAttribute('stroke-width', lineWidth);
			line.setAttribute('stroke-linecap', 'round');

			svg.appendChild(line);
		}
	}

	return svg;
}
