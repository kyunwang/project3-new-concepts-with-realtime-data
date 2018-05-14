exports.homePage = (req, res) => {
	res.render('website/homePage');
};

exports.infoPage = (req, res) => {
	res.render('website/infoPage', {enableD3: true});
};


exports.zeroState = (req, res) => {
	res.render('website/zeroState', { message: 'Zero state' });
};
