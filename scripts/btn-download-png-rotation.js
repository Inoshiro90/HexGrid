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