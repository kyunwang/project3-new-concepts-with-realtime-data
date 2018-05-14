// Data container (max length of 20)
var graphData = [];
var setAxis = true;

var svg = d3.select('#graph-piepschuimhuis');
var margin = { top: 20, right: 20, bottom: 30, left: 40 };
var width = +svg.attr('width') - margin.left - margin.right;
var height = +svg.attr('height') - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var line = d3.line().x(function(d, i) {
	return x(i);
});

var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

function renderLine(data) {
	if (data.length === 0) return;

	if (data.length === 1 && setAxis) {
		setAxis = false;

		x.domain([0, 19]);
		y.domain([getMinimum(data), getMaximum(data) + 50]);

		g
			.append('defs')
			.append('clipPath')
			.attr('id', 'clip')
			.append('rect')
			.attr('width', width)
			.attr('height', height);

		// Render the initail graphlines
		setLine('consumption');
		setLine('solar');

		// Setting the Axis
		g
			.append('g')
			.attr('transform', 'translate(0, ' + height + ')')
			.call(d3.axisBottom(x));

		g.append('g').call(d3.axisLeft(y));
	}

	function setLine(type) {
		g
			.append('g')
			.attr('clip-path', 'url(#clip)')
			.append('path')
			.datum(data)
			.attr('class', 'line')
			.attr('stroke', function() {
				return type === 'solar' ? '#00D91F' : '#B21900';
			})
			.transition()
			.duration(500)
			.ease(d3.easeLinear)
			.on('start', function(d, i) {
				tick(this, type);
			});
	}
}

function tick(element, type) {
	// if (graphData.length < 20) return;

	// Set the y dynamically on type basis
	line.y(function(d) {
		return y(normalizeNum(d[type]));
	});

	// Redraw the line.
	d3
		.select(element)
		.attr('d', line)
		.attr('transform', null);

	// Slide it to the left.
	// if (graphData.length === 20) {
	d3
		.active(element)
		.attr('transform', function() {
			if (graphData.length === 20) {
				return 'translate(' + x(-1) + ', 0)';
			}
			return 'translate(0, 0)';
		})
		.transition()
		.on('start', function(d, i) {
			tick(this, type);
		});
	// }
}
