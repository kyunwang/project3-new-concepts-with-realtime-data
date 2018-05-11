exports.tourView = (req, res) => {
	res.render('arViews/tourView', { enableAr: true, enableD3: true });
};

exports.d3Tests = (req, res) => {
	res.render('arViews/d3', { message: 'd3 test page' });
};

exports.apiTest = (req, res) => {
	res.render('arViews/api', { message: 'Api test page', data: stomp.data});
};
