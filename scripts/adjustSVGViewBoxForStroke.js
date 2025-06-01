// function adjustSVGViewBoxForStroke(svgElement) {
// 	const inputLineWidth = document.getElementById('input-field-line-width');
// 	const strokeWidthPx = parseFloat(inputLineWidth.value); // z. B. 10

// 	// Verhältnis: Canvas-Größe / ViewBox-Größe (z. B. 1080px / 1.1 units)
// 	const pxHeight = parseFloat(svgElement.getAttribute('height'));
// 	const vb = svgElement.viewBox.baseVal;

// 	const unitsPerPx = vb.height / pxHeight;
// 	const strokeWidthUnits = strokeWidthPx * unitsPerPx;

// 	const halfStroke = strokeWidthUnits / 2;

// 	// Neue ViewBox berechnen
// 	const newX = vb.x - halfStroke;
// 	const newY = vb.y - halfStroke;
// 	const newWidth = vb.width + strokeWidthUnits;
// 	const newHeight = vb.height + strokeWidthUnits;

// 	svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
// }

function adjustSVGViewBoxForStroke(svgElement) {
	if (svgElement.dataset.adjusted === "true") return; // schon angepasst

	const inputLineWidth = document.getElementById('input-field-line-width');
	const strokeWidthPx = parseFloat(inputLineWidth.value);

	const svgHeightPx = parseFloat(svgElement.getAttribute('height') || 1080);
	const viewBox = svgElement.viewBox.baseVal;

	const unitsPerPx = viewBox.height / svgHeightPx;
	const strokeWidthUnits = strokeWidthPx * unitsPerPx;
	const halfStroke = strokeWidthUnits / 2;

	const newX = viewBox.x - halfStroke;
	const newY = viewBox.y - halfStroke;
	const newWidth = viewBox.width + strokeWidthUnits;
	const newHeight = viewBox.height + strokeWidthUnits;

	svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
	svgElement.dataset.adjusted = "true"; // Markieren als erledigt
}