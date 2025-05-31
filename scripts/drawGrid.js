function drawGrid(drawPositions, drawSectors) {
	// Canvas zeichnen
	context.clearRect(-2, -2, 4, 4);
	const strokeColor = document.getElementById('input-field-line-color').value;
	const strokeWidth = document.getElementById('input-field-line-width').value / 1000;
	context.strokeStyle = strokeColor;
	context.lineWidth = strokeWidth;
	context.lineCap = context.lineJoin = 'round';
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

	// // SVG zeichnen
	// const svg = document.getElementById('svg_hexgrid');
	// svg.innerHTML = ''; // SVG leeren
	// const drawn = new Set();

	// for (let i = 0; i < grid.points.length; i++) {
	// 	const point = grid.points[i];
	// 	const neighbours = grid.neighbours[i];

	// 	for (let k = 0; k < neighbours.length; k++) {
	// 		const j = neighbours[k];
	// 		const key = [i, j].sort().join('-');
	// 		if (drawn.has(key)) continue;
	// 		drawn.add(key);

	// 		const npoint = grid.points[j];

	// 		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	// 		line.setAttribute('x1', point[0]);
	// 		line.setAttribute('y1', point[1]);
	// 		line.setAttribute('x2', npoint[0]);
	// 		line.setAttribute('y2', npoint[1]);
	// 		line.setAttribute('stroke', strokeColor);
	// 		line.setAttribute('stroke-width', strokeWidth);
	// 		line.setAttribute('stroke-linecap', 'round');
	// 		line.setAttribute('stroke-linejoin', 'round');

	// 		svg.appendChild(line);
	// 	}
	// }
	// console.log(svg.outerHTML);
}

// function drawSVGGrid() {
// 	const svg = document.getElementById('svg_hexgrid');
// 	svg.innerHTML = ''; // SVG leeren
// 	const drawn = new Set();
// 	const strokeColor = document.getElementById('input-field-line-color').value;
// 	const strokeWidth = document.getElementById('input-field-line-width').value / 1000;

// 	for (let i = 0; i < grid.points.length; i++) {
// 		const point = grid.points[i];
// 		const neighbours = grid.neighbours[i];

// 		for (let k = 0; k < neighbours.length; k++) {
// 			const j = neighbours[k];
// 			const key = [i, j].sort().join('-');
// 			if (drawn.has(key)) continue;
// 			drawn.add(key);

// 			const npoint = grid.points[j];

// 			const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
// 			line.setAttribute('x1', point[0]);
// 			line.setAttribute('y1', point[1]);
// 			line.setAttribute('x2', npoint[0]);
// 			line.setAttribute('y2', npoint[1]);
// 			line.setAttribute('stroke', strokeColor);
// 			line.setAttribute('stroke-width', strokeWidth);
// 			line.setAttribute('stroke-linecap', 'round');
// 			line.setAttribute('stroke-linejoin', 'round');

// 			svg.appendChild(line);
// 		}
// 	}
// }

function drawSVGGridAll() {
	const strokeColor = document.getElementById('input-field-line-color').value;
	const strokeWidth = document.getElementById('input-field-line-width').value / 1000;

	const drawn = new Set();
	const lineElements = [];

	// Linien einmal erzeugen
	for (let i = 0; i < grid.points.length; i++) {
		const point = grid.points[i];
		const neighbours = grid.neighbours[i];

		for (let k = 0; k < neighbours.length; k++) {
			const j = neighbours[k];
			const key = [i, j].sort().join('-');
			if (drawn.has(key)) continue;
			drawn.add(key);

			const npoint = grid.points[j];

			const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			line.setAttribute('x1', point[0]);
			line.setAttribute('y1', point[1]);
			line.setAttribute('x2', npoint[0]);
			line.setAttribute('y2', npoint[1]);
			line.setAttribute('stroke', strokeColor);
			line.setAttribute('stroke-width', strokeWidth);
			line.setAttribute('stroke-linecap', 'round');
			line.setAttribute('stroke-linejoin', 'round');

			lineElements.push(line);
		}
	}

	// Rotationen (inkl. 0°)
	const angles = [0, 60, 120, 180, 240, 300];

	angles.forEach(angle => {
		const svg = document.getElementById(`svg_hexgrid${angle === 0 ? '' : angle}`);
		if (!svg) return;

		svg.innerHTML = ''; // SVG leeren

		// Gruppiere mit Rotation
		const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		group.setAttribute('transform', `rotate(${angle} 0 0)`);

		lineElements.forEach(line => {
			group.appendChild(line.cloneNode());
		});

		svg.appendChild(group);
	});
}