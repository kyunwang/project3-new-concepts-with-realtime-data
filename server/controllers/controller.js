exports.homePage = (req, res) => {
	res.render('homePage', { message: 'Hello Server' });
};
