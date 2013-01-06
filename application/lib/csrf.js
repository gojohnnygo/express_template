module.exports = function(request, response, next) {
	response.locals.token = request.session._csrf;
	next();
};
