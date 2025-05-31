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
document.getElementById('btn-download-png-rotation').addEventListener('click', () => {
	const zip = new JSZip();
	const serializer = new XMLSerializer();

	const angles = [0, 60, 120, 180, 240, 300];

	const sides = document.getElementById('input-field-sideCount').value;
	const seed = document.getElementById('input-field-seed').value;
	const grouping = document.getElementById('input-field-grouping').value;
	const relax = document.getElementById('dropdown-innerRelaxation').value;
	const lineWidth = document.getElementById('input-field-line-width').value;
	const lineColor = document.getElementById('input-field-line-color').value.replace('#', '');
	const canvasMaxSize = parseInt(document.getElementById('input-field-size').value, 10);

	let completed = 0;

	angles.forEach(angle => {
		const id = `svg_hexgrid${angle === 0 ? '' : angle}`;
		const svgElement = document.getElementById(id);
		if (!svgElement) {
			completed++;
			return;
		}

		const svgString = serializer.serializeToString(svgElement);
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);

		const img = new Image();
		img.onload = () => {
			const vb = svgElement.viewBox.baseVal;
			const vbWidth = vb.width || svgElement.clientWidth || canvasMaxSize;
			const vbHeight = vb.height || svgElement.clientHeight || canvasMaxSize;

			let canvasWidth, canvasHeight;
			if (vbWidth > vbHeight) {
				canvasWidth = canvasMaxSize;
				canvasHeight = Math.round((vbHeight / vbWidth) * canvasMaxSize);
			} else {
				canvasHeight = canvasMaxSize;
				canvasWidth = Math.round((vbWidth / vbHeight) * canvasMaxSize);
			}

			const canvas = document.createElement('canvas');
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			const ctx = canvas.getContext('2d');

			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, canvasWidth, canvasHeight);

			ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

			canvas.toBlob(blob => {
				const filename = `hexgrid_${angle}deg_${sides}_${seed}_${grouping}_${relax}_${lineWidth}_${lineColor}_${canvasWidth}x${canvasHeight}.png`;
				zip.file(filename, blob);

				completed++;
				URL.revokeObjectURL(url);

				if (completed === angles.length) {
					zip.generateAsync({ type: 'blob' }).then(zipBlob => {
						const link = document.createElement('a');
						link.href = URL.createObjectURL(zipBlob);
						link.download = `hexgrid_pngs_${seed}.zip`;
						link.click();
						URL.revokeObjectURL(link.href);
					});
				}
			}, 'image/png');
		};

		img.onerror = () => {
			console.error(`Fehler beim Laden von SVG mit id ${id}`);
			URL.revokeObjectURL(url);
			completed++;
		};

		img.src = url;
	});
});