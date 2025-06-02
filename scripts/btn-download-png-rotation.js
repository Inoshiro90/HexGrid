document.getElementById('btn-download-png-rotation').addEventListener('click', () => {
	const zip = new JSZip();
	const angles = [0, 60, 120, 180, 240, 300];

	const sides = document.getElementById('input-field-sideCount').value;
	const seed = document.getElementById('input-field-seed').value;
	const grouping = document.getElementById('input-field-grouping').value;
	const relax = document.getElementById('dropdown-innerRelaxation').value;
	const lineWidth = document.getElementById('input-field-line-width').value;
	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');

	const promises = angles.map((angle) => {
		const suffix = angle === 0 ? '' : `_${angle}`;
		const canvas = document.getElementById(`canvas${suffix}`);
		if (!canvas) return Promise.resolve(); // Canvas nicht vorhanden

		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				if (!blob) return resolve(); // Sicherheitscheck

				const filename = `hexgrid_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvas.width}x${canvas.height}_${angle}.png`;
				zip.file(filename, blob);
				resolve();
			}, 'image/png');
		});
	});

	Promise.all(promises).then(() => {
		zip.generateAsync({ type: "blob" }).then((blob) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `hexgrid_pngs_${seed}.zip`;
			link.click();
		});
	});
});