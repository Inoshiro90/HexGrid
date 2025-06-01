const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// canvas.width = canvasSize;
// canvas.height = canvasSize;

var canvasSize = 200;

window.addEventListener('resize', updateCanvasSize);

updateCanvasSize();

let dirty = true; // Initialzustand, falls nötig

(function loop() {
	if (dirty) {
		const rng = linearCongruentialGenerator(options.seed);
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
	drawSVGGridAll();
	requestAnimationFrame(loop);
})();

document
	.getElementById('input-field-line-width')
	.addEventListener('input', updateLineWidthAndRedraw);
document
	.getElementById('input-field-line-width-slider')
	.addEventListener('input', updateLineWidthAndRedraw);

function updateLineWidthAndRedraw() {
	dirty = true; // Damit canvas neu gezeichnet wird
	drawSVGGridAll(); // SVGs neu zeichnen

	// ViewBox für alle Rotationen neu anpassen
	const angles = [0, 60, 120, 180, 240, 300];
	angles.forEach((angle) => {
		const svg = document.getElementById(`svg_hexgrid${angle === 0 ? '' : angle}`);
		if (svg) {
			// Rücksetzen, damit sie erneut angepasst werden kann
			svg.dataset.adjusted = 'false';
			adjustSVGViewBoxForStroke(svg);
		}
	});
	console.log('Linienstärke geändert');
}
