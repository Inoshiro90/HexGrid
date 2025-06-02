document.getElementById('btn-download-svg-rotation').addEventListener('click', () => {
	const zip = new JSZip();
	const serializer = new XMLSerializer();

	const angles = [0, 60, 120, 180, 240, 300];

	const sides = document.getElementById('input-field-sideCount').value;
	const seed = document.getElementById('input-field-seed').value;
	const grouping = document.getElementById('input-field-grouping').value;
	const relax = document.getElementById('dropdown-innerRelaxation').value;
	const lineWidth = document.getElementById('input-field-line-width').value;
	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
	const canvasSize = parseInt(document.getElementById('input-field-size').value, 10);

	angles.forEach(angle => {
		const id = `svg_hexgrid${angle === 0 ? '' : angle}`;
		const svgElement = document.getElementById(id);
		if (!svgElement) return;

		const svgString = serializer.serializeToString(svgElement);
		const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasSize}x${canvasSize}_${angle}.svg`;

		zip.file(filename, svgString);
	});

	// ZIP-Datei erzeugen und downloaden
	zip.generateAsync({ type: "blob" }).then(blob => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `hexgrid_svgs_${seed}.zip`;
		link.click();
	});
});