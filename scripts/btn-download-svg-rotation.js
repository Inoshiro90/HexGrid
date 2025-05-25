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
