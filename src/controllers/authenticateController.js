const loginService = require('./../../services/authenticate.service');

exports.authenticate = (req, res, next) => {
    loginService.authenticate(req.body)
        .then((token) =>
            res.status(200).json(token))
        .catch(err =>
            res.status(400).json(err));
};

exports.refreshToken = (req, res, next) => {
    loginService.refreshToken(req.body)
        .then((refreshToken) =>
            res.status(200).json(refreshToken))
        .catch(err =>
            res.status(401).json(err));
};