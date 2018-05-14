// Data container (max length of 20)
var graphData = [];

// We scale the height of our bars using d3's linear scale
var vScale = d3.scaleLinear().range([0, 3]);

// Getting the containers to assign the curve points to
var ghConsumption = d3.select('#a-greenhouse-consumption-line');
var ghSolar = d3.select('#a-greenhouse-solar-line');

// Getting the label value containers
var labelConsumption = d3.select('#a-consumption-value');
var labelSolar = d3.select('#a-solar-value');

function renderLine(data) {
	if (data.length === 0) return;

	// Assign and update the scale at each (re)render
	vScale.domain([getMinimum(data), getMaximum(data)]);

	// We select the scene object just like an svg
	var ghConLine = ghConsumption.selectAll('a-curve-point').data(data);
	var ghSolLine = ghSolar.selectAll('a-curve-point').data(data);

	var lastItem = data[data.length - 1];

	// Calling the function to set the curve points
	// Which will create the path for the line
	setLine(ghConLine, 'consumption');
	setLine(ghSolLine, 'solar');

	setLabel(labelConsumption, lastItem, 'consumption');
	setLabel(labelSolar, lastItem, 'solar');
}

function setLine(lineGraph, type) {
	// We use d3's enter/update/exit pattern to draw and bind our dom elements
	lineGraph
		.enter()
		.append('a-curve-point')
		.merge(lineGraph)
		.attr('position', function(d, i) {
			var position = {
				x: 0.1 * (i * 2),
				y: 0,
				z: 0 - vScale(normalizeNum(d[type])) / 2,
			};
			return position;
		});
	// For testing the points. Renders a box at each curve point
	// .attr('geometry', function(d) {
	// 	var attr = {
	// 		primitive: 'box',
	// 		height: 0.1,
	// 		width: 0.1,
	// 		depth: 0.1,
	// 	};

	// Remove old elements as needed.
	lineGraph.exit().remove();
}

// Setting the values of the labels
function setLabel(label, data, type) {
	label.attr('value', normalizeNum(data[type]));
}

// Initial render
renderLine(graphData);

// Getting the min/max numbers of an array
function getMinimum(data) {
	var min = d3.min(data, function(d) {
		return smallerNum(d.consumption, normalizeNum(d.solar));
	});

	return min - 5;
}

function getMaximum(data) {
	var max = d3.max(data, function(d) {
		return biggerNum(d.consumption, normalizeNum(d.solar));
	});
	return max + 5;
}

// Make all the numbers positive and with a decimal of 2
function normalizeNum(num) {
	return Math.abs(num).toFixed(2);
}

// Return the smaller/larger number
function smallerNum(num1, num2) {
	if (num1 > num2) return num2;
	return num1;
}

function biggerNum(num1, num2) {
	if (num1 > num2) return num1;
	return num2;
}
