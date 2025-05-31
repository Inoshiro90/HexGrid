const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = canvasSize;
canvas.height = canvasSize;

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
