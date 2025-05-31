document.getElementById('btn-download-svg').addEventListener('click', () => {
	const svgElement = document.getElementById('svg_hexgrid');
	const serializer = new XMLSerializer();
	const svgString = serializer.serializeToString(svgElement);
	const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});

	const sides = document.getElementById('input-field-sideCount').value;
	const seed = document.getElementById('input-field-seed').value;
	const grouping = document.getElementById('input-field-grouping').value;
	const relax = document.getElementById('dropdown-innerRelaxation').value;
	const lineWidth = document.getElementById('input-field-line-width').value;
	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10);

	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize}.svg`;
	link.click();
});

// // Event-Listener für Download-Buttons
// document.getElementById('btn-download-svg').addEventListener('click', function () {
// 	const svgElement = document.getElementById('svg_hexgrid');
// 	if (svgElement) {
// 		downloadSVG(svgElement);
// 	} else {
// 		console.error('No SVG element found.');
// 	}
// });

// function downloadSVG(svgElement) {
// 	const sides = document.getElementById('input-field-sideCount').value;
// 	const seed = document.getElementById('input-field-seed').value;
// 	const grouping = document.getElementById('input-field-grouping').value;
// 	const relax = document.getElementById('dropdown-innerRelaxation').value;
// 	const lineWidth = document.getElementById('input-field-line-width').value;
// 	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
// 	const canvasSize = document.getElementById('input-field-size').value;

// 	// console.log(dimensions);
// 	if (!svgElement) {
// 		console.error('Error: SVG element not found.');
// 		return;
// 	}

// 	// Konvertiere das SVG-Element in einen String
// 	const svgContent = new XMLSerializer().serializeToString(svgElement);

// 	// Erstelle einen Blob mit dem richtigen MIME-Typ für SVG
// 	const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});

// 	// Erstelle eine URL für den Blob
// 	const svgUrl = URL.createObjectURL(svgBlob);

// 	// Erstelle einen versteckten Download-Link
// 	const link = document.createElement('a');
// 	link.href = svgUrl;
// 	link.download = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${Math.round(
// 		canvasSize * 0.87
// 	)}.svg`; // Datei-Benennung

// 	// Klick auf den Link, um den Download zu starten
// 	document.body.appendChild(link); // Link temporär in den DOM einfügen
// 	link.click(); // Download auslösen
// 	document.body.removeChild(link); // Link wieder entfernen

// 	// Speicher freigeben
// 	URL.revokeObjectURL(svgUrl);
// }
