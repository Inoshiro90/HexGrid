const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = canvasSize;
canvas.height = canvasSize;

// a LCG to use as a seedable RNG
function lcg(seed) {
	let state = seed;

	return function () {
		const result = (state * 48271) % 2147483647;
		state = result;
		return result / 2147483647;
	};
}

var canvasSize = 200;

// function updateCanvasSize() {
// 	canvasSize = Math.max(350, Math.min(window.innerHeight - 100, window.innerWidth)) | 0;
// 	canvas.width = canvas.height = canvasSize;
// 	context.translate(canvasSize * 0.5, canvasSize * 0.5);
// 	context.scale(canvasSize * 0.45, canvasSize * 0.45);
// }

window.addEventListener('resize', updateCanvasSize);

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

function drawGridToSVG(grid, options) {
	const xmlns = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS(xmlns, 'svg');
	const size = parseInt(document.getElementById('input-field-size').value, 10);
	svg.setAttribute('width', size);
	svg.setAttribute('height', size);
	svg.setAttribute('viewBox', '-2 -2 4 4');
	svg.setAttribute('xmlns', xmlns);

	const lineColor = document.getElementById('input-field-line-color').value;
	const lineWidth = document.getElementById('input-field-line-width').value / 1000;

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

function updateCanvasSize() {
	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10) || 500;

	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	canvas.height = canvasSize;
	canvas.width = canvas.height * 0.87;

	// canvas.height = parseInt(document.getElementById('input-field-size').value, 10);
	// canvas.width = Math.round((canvas.height * 157) / 180);

	context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
	context.translate(canvasSize * 0.435, canvasSize * 0.5);
	context.scale(canvasSize * 0.5, canvasSize * 0.5);
}
updateCanvasSize();

let dirty = true; // Initialzustand, falls nötig

const options = {
	get sideCount() {
		return parseInt(document.getElementById('input-field-sideCount').value, 10);
	},
	get seed() {
		return parseInt(document.getElementById('input-field-seed').value, 10);
	},
	get searchIterationCount() {
		return parseInt(document.getElementById('input-field-grouping').value, 10);
	},
	get innerRelaxation() {
		return document.getElementById('dropdown-innerRelaxation').value;
	},
};

document.getElementById('btn-generate').addEventListener('click', () => {
	// Hier führst du dann dein Generierungslogik mit `options` aus
	updateCanvasSize();
	setAsDirty(); // Falls notwendig
});

function setAsDirty() {
	dirty = true;
	// console.log('Options changed → dirty = true');
}

(function loop() {
	if (dirty) {
		const rng = lcg(options.seed);
		grid = new Hexagrid(
			options.sideCount,
			rng,
			options.searchIterationCount,
			options.forceCircleShape
		);
		dirty = false;
	}

	if (options.innerRelaxation !== 'None') {
		if (options.innerRelaxation === 'Weighted') {
			grid.relaxWeighted();
		} else {
			grid.relax();
		}

		if (options.sideRelaxation && !options.forceCircleShape) {
			grid.relaxSide();
		}
	}

	drawGrid(options.drawPositions, options.drawSectors);
	requestAnimationFrame(loop);
})();

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
	const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize*0.87}.png`;

	// Canvas als PNG exportieren
	const image = canvas.toDataURL('image/png');

	// Temporären Link zum Herunterladen erstellen
	const link = document.createElement('a');
	link.href = image;
	link.download = filename;
	link.click();
});

// document.getElementById('btn-download-png-rotation').addEventListener('click', () => {
// 	const originalCanvas = document.getElementById('canvas');
// 	if (!originalCanvas) {
// 		alert('Canvas not found!');
// 		return;
// 	}

// 	const sides = document.getElementById('input-field-sideCount').value;
// 	const seed = document.getElementById('input-field-seed').value;
// 	const grouping = document.getElementById('input-field-grouping').value;
// 	const relax = document.getElementById('dropdown-innerRelaxation').value;
// 	const lineWidth = document.getElementById('input-field-line-width').value;
// 	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
// 	// const canvasSize = parseInt(document.getElementById('input-field-size').value, 10);

// 	const offCanvas = document.createElement('canvas');
// 	const ctx = offCanvas.getContext('2d');
// 	offCanvas.width = offCanvas.height = canvasSize;

// 	const angles = [0, 60, 120, 180, 240, 300];
// 	const zip = new JSZip();

// 	for (let angleDeg of angles) {
// 		const angleRad = (angleDeg * Math.PI) / 180;

// 		ctx.setTransform(1, 0, 0, 1, 0, 0);
// 		ctx.clearRect(0, 0, canvasSize, canvasSize);
// 		ctx.translate(canvasSize / 2, canvasSize / 2);
// 		ctx.rotate(angleRad);
// 		ctx.translate(-canvasSize / 2, -canvasSize / 2);
// 		ctx.drawImage(originalCanvas, 0, 0, canvasSize, canvasSize);

// 		const dataUrl = offCanvas.toDataURL('image/png');
// 		const base64Data = dataUrl.split(',')[1];
// 		const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize}_${angleDeg}.png`;
// 		zip.file(filename, base64Data, {base64: true});
// 	}

// 	zip.generateAsync({type: 'blob'}).then((blob) => {
// 		saveAs(
// 			blob,
// 			`hexgrid_rotations_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize}.zip`
// 		);
// 	});
// });

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

// document.getElementById('btn-download-svg').addEventListener('click', () => {
// 	const svgElement = drawGridToSVG(grid, options);
// 	const serializer = new XMLSerializer();
// 	const svgString = serializer.serializeToString(svgElement);
// 	const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});

// 	const sides = document.getElementById('input-field-sideCount').value;
// 	const seed = document.getElementById('input-field-seed').value;
// 	const grouping = document.getElementById('input-field-grouping').value;
// 	const relax = document.getElementById('dropdown-innerRelaxation').value;
// 	const lineWidth = document.getElementById('input-field-line-width').value;
// 	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
// 	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10);

// 	const link = document.createElement('a');
// 	link.href = URL.createObjectURL(blob);
// 	link.download = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize}.svg`;
// 	link.click();
// });

// document.getElementById('btn-download-svg-rotation').addEventListener('click', () => {
// 	const sides = document.getElementById('input-field-sideCount').value;
// 	const seed = document.getElementById('input-field-seed').value;
// 	const grouping = document.getElementById('input-field-grouping').value;
// 	const relax = document.getElementById('dropdown-innerRelaxation').value;
// 	const lineWidth = document.getElementById('input-field-line-width').value;
// 	const lineColor = document.getElementById('input-field-line-color').value;
// 	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10);
// 	const scale = canvasSize * 0.45;

// 	const zip = new JSZip();
// 	const angles = [0, 60, 120, 180, 240, 300];

// 	angles.forEach((angleDeg) => {
// 		const svgParts = [];

// 		svgParts.push(`<?xml version="1.0" standalone="no"?>`);
// 		svgParts.push(
// 			`<svg xmlns="http://www.w3.org/2000/svg" width="${canvasSize}" height="${canvasSize}" viewBox="-1 -1 2 2">`
// 		);
// 		svgParts.push(`<g transform="translate(0,0) scale(1) rotate(${angleDeg})">`);

// 		svgParts.push(
// 			`<g stroke="${lineColor}" stroke-width="${
// 				lineWidth / 1000
// 			}" fill="none" stroke-linecap="round" stroke-linejoin="round">`
// 		);

// 		for (let i = 0; i < grid.points.length; i++) {
// 			const point = grid.points[i];
// 			const neighbours = grid.neighbours[i];

// 			for (let k = 0; k < neighbours.length; k++) {
// 				const npoint = grid.points[neighbours[k]];

// 				svgParts.push(
// 					`<line x1="${point[0]}" y1="${point[1]}" x2="${npoint[0]}" y2="${npoint[1]}" />`
// 				);
// 			}
// 		}

// 		svgParts.push(`</g></g></svg>`);

// 		const blob = new Blob([svgParts.join('\n')], {type: 'image/svg+xml'});
// 		const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor.replace(
// 			'#',
// 			''
// 		)}_${canvasSize}x${canvasSize}_${angleDeg}.svg`;

// 		zip.file(filename, blob);
// 	});

// 	zip.generateAsync({type: 'blob'}).then((blob) => {
// 		saveAs(
// 			blob,
// 			`hexgrid_rotations_svg_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor.replace(
// 				'#',
// 				''
// 			)}_${canvasSize}x${canvasSize}.zip`
// 		);
// 	});
// });
