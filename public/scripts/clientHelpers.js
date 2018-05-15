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
