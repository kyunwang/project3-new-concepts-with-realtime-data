// fake data
var fakeData = [
	10,
	20,
	30,
	15,
	25,
	35,
	40,
	45,
	50,
	70,
	100,
	120,
	130,
	12,
	18,
	22,
	29,
	33,
	44,
	59,
	200,
];

function render(data) {
	// we scale the height of our bars using d3's linear scale
	var hscale = d3
		.scaleLinear()
		.domain([0, d3.max(data)])
		.range([0, 3]);

	// we select the scene object just like an svg
	var scene = d3.select('#a-greenhouse');

	// we use d3's enter/update/exit pattern to draw and bind our dom elements
	// var bars = scene.selectAll('a-cube.bar').data(data);

	scene
		.selectAll('a-box')
		.data(data)
		.enter()
		.append('a-box')
		.attr('color', 'red')
		.attr('opacity', 0.7)
		.attr('width', 0.2)
		.attr('height', function(d, i) {
			return hscale(d);
		})
		.attr('position', function(d, i) {
			var position = {
				x: 0.15 * (i * 2),
				// x: 0,
				// y: 0.25 * (i * 2),
				y: 0,
				// z: -0.25 * (i * 2),
				z: 0 - hscale(d) / 2,
			};
			return position;
		})
		.attr('rotation', function(d, i) {
			return {
				x: 90,
				y: 0,
				z: 0,
			};
		})
		.attr('depth', 0.5);
}

render(fakeData);
