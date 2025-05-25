const options = {
	get sideCount() {
		return parseInt(document.getElementById('input-field-sideCount').value, 10);
	},
	get seed() {
		return parseInt(document.getElementById('input-field-seed').value, 10);
	},
	get searchIterationCount() {
		return parseInt(document.getElementById('input-field-grouping').value, 10);
	},
	get innerRelaxation() {
		return document.getElementById('dropdown-innerRelaxation').value;
	},
};
