// function drawGrid(drawPositions, drawSectors) {
// 	const strokeColor = document.getElementById('input-field-line-color').value;
// 	const strokeWidthRaw = parseFloat(document.getElementById('input-field-line-width').value);
// 	const strokeWidth = strokeWidthRaw / 1000;

// 	context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

// 	const marginPixels = strokeWidthRaw * 0.5;

// 	const usableWidth = canvas.width - marginPixels;
// 	const usableHeight = canvas.height - marginPixels;

// 	const hexWidthInUnits = 3;
// 	const hexHeightInUnits = hexWidthInUnits * (canvas.height / canvas.width);

// 	const extraScale = 1.7275;

// 	const scale =
// 		Math.min(usableWidth / hexWidthInUnits, usableHeight / hexHeightInUnits) * extraScale;

// 	context.setTransform(scale, 0, 0, -scale, canvas.width / 2, canvas.height / 2);

// 	const margin = strokeWidth * 2;
// 	context.clearRect(-2 - margin, -2 - margin, 4 + margin * 2, 4 + margin * 2);

// 	context.strokeStyle = strokeColor;
// 	context.lineWidth = strokeWidth;
// 	context.lineCap = context.lineJoin = 'round';
// 	context.beginPath();

// 	for (let i = 0; i < grid.points.length; i++) {
// 		const point = grid.points[i];
// 		const neighbours = grid.neighbours[i];

// 		for (let k = 0; k < neighbours.length; k++) {
// 			const npoint = grid.points[neighbours[k]];
// 			context.moveTo(point[0], point[1]);
// 			context.lineTo(npoint[0], npoint[1]);
// 		}
// 	}
// 	context.stroke();
// }

function drawGridRotated(suffix, angleDeg) {
	const canvas = document.getElementById(`canvas${suffix}`);
	if (!canvas) return;

	const context = canvas.getContext('2d');
	const strokeColor = document.getElementById('input-field-line-color').value;
	const strokeWidthRaw = parseFloat(document.getElementById('input-field-line-width').value);
	const strokeWidth = strokeWidthRaw / 1000;

	context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

	const marginPixels = strokeWidthRaw * 0.5;

	const usableWidth = canvas.width - marginPixels;
	const usableHeight = canvas.height - marginPixels;

	const hexWidthInUnits = 3;
	const hexHeightInUnits = hexWidthInUnits * (canvas.height / canvas.width);

	const extraScale = 1.7275;

	const scale = Math.min(usableWidth / hexWidthInUnits, usableHeight / hexHeightInUnits) * extraScale;

	// Rotation vorbereiten (in rad)
	const angleRad = (angleDeg * Math.PI) / 180;

	// Transformation: Skalierung, Rotation, Y-Spiegelung, Zentrierung
	const cos = Math.cos(angleRad);
	const sin = Math.sin(angleRad);

	context.setTransform(
		scale * cos,           // a
		-scale * sin,          // b (Y gespiegelt)
		scale * sin,           // c
		scale * cos,           // d
		canvas.width / 2,      // e
		canvas.height / 2      // f
	);

	// Clear & Style
	const margin = strokeWidth * 2;
	context.clearRect(-2 - margin, -2 - margin, 4 + margin * 2, 4 + margin * 2);
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
}

function drawAllCanvasRotations() {
	const angles = [0, 60, 120, 180, 240, 300];
	angles.forEach((angle) => {
		const suffix = angle === 0 ? '' : `_${angle}`;
		drawGridRotated(suffix, angle);
	});
}

function drawSVGGridAll() {
	const strokeColor = document.getElementById('input-field-line-color').value;
	const strokeWidthRaw = document.getElementById('input-field-line-width').value;
	const strokeWidth = strokeWidthRaw / 1000;

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

	// Hilfsfunktion für ViewBox-Berechnung
	function getBoundingBox(points) {
		let minX = Infinity,
			maxX = -Infinity;
		let minY = Infinity,
			maxY = -Infinity;

		points.forEach(([x, y]) => {
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		});

		return {minX, maxX, minY, maxY};
	}

	// Rotationen (inkl. 0°)
	const angles = [0, 60, 120, 180, 240, 300];

	angles.forEach((angle) => {
		const svg = document.getElementById(`svg_hexgrid${angle === 0 ? '' : angle}`);
		if (!svg) return;

		svg.innerHTML = ''; // SVG leeren

		// Gruppiere mit Rotation
		const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		group.setAttribute('transform', `scale(1, -1) rotate(${angle} 0 0)`);

		lineElements.forEach((line) => {
			group.appendChild(line.cloneNode());
		});

		svg.appendChild(group);

		// BoundingBox + ViewBox setzen
		const bbox = getBoundingBox(grid.points);
		const padding = strokeWidth;

		const viewBox = [
			bbox.minX - padding * 0.5,
			bbox.minY - padding * 0.5,
			bbox.maxX - bbox.minX + padding,
			bbox.maxY - bbox.minY + padding,
		].join(' ');

		svg.setAttribute('viewBox', viewBox);
	});
}
