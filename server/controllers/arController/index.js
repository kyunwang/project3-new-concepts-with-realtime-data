exports.homePage = (req, res) => {
	res.render('homePage', { message: 'Homepage for AR' });
};

exports.d3Tests = (req, res) => {
	res.render('d3', { message: 'd3 test page' });
};
