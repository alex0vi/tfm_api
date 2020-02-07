module.exports = function (req, res, next) {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,HEAD,PATCH,PUT,POST,DELETE,ALLOW-ORIGIN');
    res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization');

    next();
};
