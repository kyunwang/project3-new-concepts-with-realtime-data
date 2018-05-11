// fake data
var fakeData = [10, 20, 30, 45, 50, 70, 100, 120, 130, 12, 29, 59, 200];

var random = d3.randomNormal(0, 200);

// we scale the height of our bars using d3's linear scale
var hscale = d3.scaleLinear().range([0, 5]);

var greenhouseLine = d3.select('#a-greenhouse-line');

function render(data) {
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
		.attr('depth', 0.2);
}

function renderLine(data) {
	// Assign and update the scale at each (re)render
	// hscale.domain([0, d3.max(data)]);
	hscale.domain([0, 1000]);

	// we select the scene object just like an svg
	var curveTrack = greenhouseLine.selectAll('a-curve-point').data(data);

	// we use d3's enter/update/exit pattern to draw and bind our dom elements
	curveTrack
		.enter()
		.append('a-curve-point')
		.merge(curveTrack)
		.attr('position', function(d, i) {
			var position = {
				x: 0.15 * (i * 2),
				y: 0,
				z: 0 - hscale(d) / 2,
			};
			return position;
		})
		.attr('geometry', function(d) {
			var attr = {
				primitive: 'box',
				height: 0.1,
				width: 0.1,
				depth: 0.1,
			};

			return attr;
		});
	// .transition()
	// .duration(1500)
	// // .ease(d3.easeLinear)
	// .on('start', tick);

	// EXIT
	// Remove old elements as needed.
	curveTrack.exit().remove();

	// paintLine();
}

function paintLine() {
	// greenhouseLine.insert('a-text');
	var ghl = document.getElementById('a-greenhouse-line');
	console.log('painting', ghl);

	var element = document.getElementById('a-greenhouse-curve');
	element.outerHTML = '';
	delete element;

	// ghl.insertAdjacentHTML(
	// 	'afterend',
	// 	'<a-draw-curve id="a-greenhouse-curve" curveref="#a-greenhouse-line" material="shader: line; color: blue;"></a-draw-curve>'
	// );
	ghl.insertAdjacentHTML(
		'afterend',
		'<a-entity clone-along-curve="curve: #a-greenhouse-line; spacing: 0.05; scale: 1 1 1; rotation: 0 0 0;" geometry="primitive:box; height:0.1; width:0.2; depth:0.1"></a-entity>'
	);
}

// Initial render
// render(fakeData);
renderLine(fakeData);

setInterval(async function() {
	console.log('Call');
	await tick();
	renderLine(fakeData);
}, 1500);

// Grab a random sample of letters from the alphabet, in alphabetical order.
// d3.interval(async function() {
// 	await tick();
// 	// await renderLine(fakeData);
// }, 1500);

function tick() {
	// Push a new data point onto the back.
	fakeData.push(random());

	// d3.select(this).transition().duration(1000)
	//    .attr({
	//      metalness: 0.5,
	//      width: 2
	//    })

	// Redraw the line.

	// Slide it to the left.
	// d3
	// 	.active(this)
	// 	.attr('position', function(d, i) {
	// 		console.log(d);

	// 		var position = {
	// 			x: 0.15 * (i * 2),
	// 			y: 0,
	// 			z: 0 - hscale(d) / 2,
	// 		};
	// 		return position;
	// 	})
	// 	.transition()
	// 	.on('start', tick);

	// Pop the old data point off the front.

	fakeData.shift();
	// renderLine(fakeData);
}
