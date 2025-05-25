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